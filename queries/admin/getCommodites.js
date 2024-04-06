export default {
  run: async (req, res, pg) => {
    let query = `
            SELECT nom FROM commodite;
        `;

    let data = await pg.query(query);
    res.send(data.rows);
  },
};
