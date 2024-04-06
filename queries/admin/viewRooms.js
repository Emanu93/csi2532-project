export default {
  run: async (req, res, pg) => {
    let query = `
        SELECT c.*, string_agg(comm.nom, ', ') as commodites 
        FROM chambre as c NATURAL LEFT OUTER JOIN a_commodite as comm
        WHERE num_chaine = CAST($1 as INTEGER) AND num_hotel = CAST($2 as INTEGER)
        GROUP BY c.num_chaine, c.num_hotel, c.num_chambre, c.capacite, c.vue, c.problemes, c.superficie, c.peut_etendre`;

    let values = [req.query.search_r_ch_id, req.query.search_r_h_id];
    let data = await pg.query(query, values);
    res.send(data.rows);
  },
};
