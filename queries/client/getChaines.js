export default {
  run: async (req, res, pg) => {
    let query = `
            SELECT DISTINCT nom FROM chaine_hotel;
        `;

    let data = await pg.query(query);
    res.send(data.rows);
  },
};
