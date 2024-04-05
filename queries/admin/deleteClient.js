export default {
  run: async (req, res, pg) => {
    try {
      let values = [req.query.del_c_nas];
      let query = `SELECT adresse FROM client WHERE nas = CAST($1 as INTEGER)`;

      let data = await pg.query(query, values);

      if (!data.rows[0])
        return res.send("Aucun client avec ce NAS n'a été trouvé.");

      query = `
            DELETE FROM client WHERE nas = CAST($1 as INTEGER)`;

      await pg.query(query, values);

      query = `DELETE FROM adresse WHERE id_adresse = CAST($1 as INTEGER)`;

      await pg.query(query, [data.rows[0].adresse]);

      res.send("Compte client supprimé.");
    } catch (e) {
      return res.send("ERROR: " + e.message);
    }
  },
};
