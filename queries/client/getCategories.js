export default {
  run: async (req, res, pg) => {
    let query = `
            SELECT DISTINCT categorie FROM hotel;
        `

    let data = await pg.query(query);
    res.send(data.rows);
  },
};
