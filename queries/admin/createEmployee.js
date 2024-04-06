export default {
  run: async (req, res, pg) => {
    try {
      let query = `
        INSERT INTO employee(nas, num_chaine, num_hotel, nom, prenom, adresse) VALUES (
            CAST($1 as INTEGER),
            CAST($2 as INTEGER),
            CAST($3 as INTEGER),
            $4,
            $5,
            CAST($6 as INTEGER)
        )`;

      let values = [
        req.query.e_nas,
        req.query.e_ch_id,
        req.query.e_h_id,
        req.query.e_nom,
        req.query.e_prenom,
        req.query.adresse
      ];

      await pg.query(query, values);

      let data = await pg.query("SELECT titre FROM role");
      let roles = data.rows.map((r) => r.titre);

      for (const role of roles) {
        let r = role.replace(/\s/g, "").toLowerCase();
        if (req.query["e_r_" + r] == "true") {
          query = `INSERT INTO accomplit(nas, titre) VALUES (
                CAST($1 as INTEGER),
                $2
                )`;
          values = [req.query.e_nas, role];
          await pg.query(query, values);
        }
      }

      let g_updated = ""
      
      if (req.query.e_gestionnaire == "true"){
        query = `UPDATE hotel SET nas_gestionnaire = CAST($1 as INTEGER) WHERE num_chaine = CAST($2 as INTEGER) AND num_hotel = CAST($3 as INTEGER)`;
        values = [
            req.query.e_nas,
            req.query.e_ch_id,
            req.query.e_h_id
        ]
        await pg.query(query, values);
        g_updated = "L'employé à été défini comme gestionnaire de l'hotel #" + req.query.e_h_id + "."
      }

      res.send("Compte employé créée.<br>" + g_updated);
    } catch (e) {
      res.send("ERROR: " + e.message);
    }
  },
};
