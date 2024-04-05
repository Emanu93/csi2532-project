export default {
  run: async (req, res, pg) => {
    try {
        let values = [req.query.del_chaine_id];
        let query = `SELECT adresse_bc FROM chaine_hotel WHERE num_chaine = CAST($1 as INTEGER)`

        let data = await pg.query(query, values);

        if(!data.rows[0]) return res.send("Cette chaine n'as pas pu être trouvée.")

        query = `
            DELETE FROM chaine_hotel WHERE num_chaine = CAST($1 as INTEGER)`;

        
        await pg.query(query, values);

        query = `DELETE FROM adresse WHERE id_adresse = CAST($1 as INTEGER)`;

        console.log(await pg.query(query, [data.rows[0].adresse_bc]))

        res.send("Chaine hôtelière supprimée.");
    } catch (e) {
        return res.send("ERROR: " + e.message)
    }
  },
};
