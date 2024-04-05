export default {
  run: async (req, res, pg) => {
    let query = `
        SELECT *, adresse_string(adresse) FROM hotel WHERE num_chaine = CAST($1 as INTEGER)`;

    let values = [req.query.search_h_ch_id]
    let data = await pg.query(query, values);
    res.send(data.rows);
  },
};
