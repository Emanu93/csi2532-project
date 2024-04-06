export default {
  run: async (req, res, pg) => {
    let query = `
            SELECT titre FROM role;
        `;

    let data = await pg.query(query);
    res.send(data.rows);
  },
};
