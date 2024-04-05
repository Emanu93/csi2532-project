export default {
  run: async (req, res, pg) => {
    try {
      let values = [req.query.del_e_nas];
      let query = `SELECT adresse FROM employee WHERE nas = CAST($1 as INTEGER)`;

      let data = await pg.query(query, values);

      if (!data.rows[0])
        return res.send("Aucun employé avec ce NAS n'a été trouvé.");

      query = `
            DELETE FROM employee WHERE nas = CAST($1 as INTEGER)`;

      await pg.query(query, values);

      query = `DELETE FROM adresse WHERE id_adresse = CAST($1 as INTEGER)`;

      await pg.query(query, [data.rows[0].adresse]);

      res.send("Compte employé supprimé.");
    } catch (e) {
      return res.send("ERROR: " + e.message);
    }
  },
};
