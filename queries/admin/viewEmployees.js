export default {
  run: async (req, res, pg) => {
    let query = `
        SELECT employee.*, adresse_string(adresse) as empl_adresse, string_agg(accomplit.titre, ', ') as roles
        FROM employee NATURAL JOIN accomplit
        WHERE num_chaine = CAST($1 as INTEGER) AND num_hotel = CAST($2 as INTEGER)
        GROUP BY nas, num_chaine, num_hotel, nom, prenom, empl_adresse`;

    let values = [req.query.search_e_ch_id, req.query.search_e_h_id];
    let data = await pg.query(query, values);
    res.send(data.rows);
  },
};
