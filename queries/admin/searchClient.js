export default {
  run: async (req, res, pg) => {
    let query = `
        SELECT *, adresse_string(adresse) as cl_adresse
        FROM client
        WHERE ('null' like $1 OR client.nom like $1) AND ('null' like $2 OR client.prenom like $2)`;

    let values = [req.query.c_nom || "null", req.query.c_prenom || "null"];
    let data = await pg.query(query, values);
    res.send(data.rows);
  },
};
