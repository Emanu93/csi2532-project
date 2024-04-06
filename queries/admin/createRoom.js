export default {
  run: async (req, res, pg) => {
    try {
      let query = `
        INSERT INTO chambre(num_chaine, num_hotel, num_chambre, capacite, vue, problemes, superficie, peut_etendre, prix) VALUES (
            CAST($1 as INTEGER),
            CAST($2 as INTEGER),
            CAST($3 as INTEGER),
            CAST($4 as INTEGER),
            $5,
            $6,
            CAST($7 as INTEGER),
            CAST($8 as BOOLEAN),
            CAST($9 as NUMERIC(5,2))
        )`;

      let values = [
        req.query.r_ch_id,
        req.query.r_h_id,
        req.query.r_num,
        req.query.r_capacity,
        req.query.r_vue || "N/A",
        req.query.r_problemes || "N/A",
        req.query.r_size,
        req.query.r_etendre || "false",
        req.query.r_prix
      ];

      await pg.query(query, values);

      let data = await pg.query("SELECT * FROM commodite");
      let commodites = data.rows.map(c => c.nom)
      
      for (const comm of commodites){
        let c = comm.replace(/\s/g, "").toLowerCase()
        if (req.query['r_c_' + c] == "true") {
          query = `INSERT INTO a_commodite(num_chaine, num_hotel, num_chambre, nom) VALUES (
                CAST($1 as INTEGER),
                CAST($2 as INTEGER),
                CAST($3 as INTEGER),
                $4
                )`;
          values = [req.query.r_ch_id, req.query.r_h_id, req.query.r_num, comm];
          await pg.query(query, values)
        }
      }
      console.log(req.query)

      res.send("Chambre #" + req.query.r_num + " créée.");
    } catch (e) {
      res.send("ERROR: " + e.message);
    }
  },
};
