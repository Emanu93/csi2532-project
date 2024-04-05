export default {
  run: async (req, res, pg) => {
    try {
      let id = parseInt(new Date().getTime().toString().substring(4));

      let query = `
        INSERT INTO hotel(num_chaine, num_hotel, nom, adresse, categorie, zone, classement, nas_gestionnaire) VALUES (
            CAST($1 as INTEGER),
            CAST($2 as INTEGER),
            $3,
            CAST($4 as INTEGER),
            $5,
            $6,
            CAST($7 as NUMERIC(2,1)),
            null
        )`;

      let values = [
        req.query.h_ch_id,
        id,
        req.query.h_nom,
        req.query.adresse,
        req.query.h_categorie,
        req.query.h_zone,
        req.query.h_rating
      ];

      await pg.query(query, values);
      res.send("Hôtel créée avec l'ID #" + id + ".");
    } catch (e) {
      res.send("ERROR: " + e.message);
    }
  },
};
