export default {
  run: async (req, res, pg) => {
    try {
        let values = [req.query.del_r_ch_id, req.query.del_r_h_id, req.query.del_r_num];
        let query = `SELECT * 
                    FROM chambre 
                    WHERE num_chaine = CAST($1 as INTEGER) 
                        AND num_hotel = CAST($2 as INTEGER)
                        AND num_chambre = CAST($3 as INTEGER)`;

        let data = await pg.query(query, values);

        if (!data.rows[0]) return res.send("Cette chambre n'as pas pu être trouvée.");

        query = `
            DELETE FROM chambre
            WHERE num_chaine = CAST($1 as INTEGER) 
                        AND num_hotel = CAST($2 as INTEGER)
                        AND num_chambre = CAST($3 as INTEGER)`;

        await pg.query(query, values);

        res.send("Chambre supprimée.");
    } catch (e) {
        return res.send("ERROR: " + e.message)
    }
  },
};
