export default {
  run: async (req, res, pg) => {
    try {
        let id = parseInt(new Date().getTime().toString().substring(4));

        let query = `
        INSERT INTO chaine_hotel(num_chaine, nom, adresse_bc) VALUES (
            CAST($1 as INTEGER),
            $2,
            CAST($3 as INTEGER)
        )`;

        let values = [
            id,
            req.query.ch_nom,
            req.query.adresse_bc
        ]

        await pg.query(query, values);
        res.send("Chaine hôtelière créée avec l'ID #" + id + ".");
    } catch (e) {
        res.send("ERROR: " + e.message)
    }
  },
};
