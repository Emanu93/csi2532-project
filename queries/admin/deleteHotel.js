export default {
  run: async (req, res, pg) => {
    try {
        let values = [req.query.del_hotel_ch_id, req.query.del_hotel_h_id];
        let query = `SELECT adresse 
                    FROM hotel 
                    WHERE num_chaine = CAST($1 as INTEGER) AND num_hotel = CAST($2 as INTEGER)`;

        let data = await pg.query(query, values);

        if (!data.rows[0]) return res.send("Cette hotel n'as pas pu être trouvée.");

        query = `
            DELETE FROM hotel WHERE num_chaine = CAST($1 as INTEGER) AND num_hotel = CAST($2 as INTEGER)`;

        await pg.query(query, values);

        query = `DELETE FROM adresse WHERE id_adresse = CAST($1 as INTEGER)`;

        await pg.query(query, [data.rows[0].adresse]);

        res.send("Hôtel supprimée.");
    } catch (e) {
        return res.send("ERROR: " + e.message)
    }
  },
};
