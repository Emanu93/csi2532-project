export default {
  run: async (req, res, pg) => {
    let query = `
        SELECT *, adresse_string(adresse_bc) as adresse FROM chaine_hotel`;

    let data = await pg.query(query);
    res.send(data.rows);
  },
};
