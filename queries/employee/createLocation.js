export default {
  run: async (req, res, pg) => {
    let query = "SELECT * FROM Client WHERE nas = CAST($1 AS INTEGER)";
    let values = [req.query.b_nas];

    let data = await pg.query(query, values);
    if (!data.rows[0]) {
      console.log(data);
      return res.send(
        "Il n'y a pas de compte client associé à ce NAS, veuillez en créer un et réessayer."
      );
    }

    let id = parseInt(new Date().getTime().toString().substring(4));

    query = `INSERT INTO reservation(id, num_chaine, num_hotel, num_chambre, NAS_client, date_debut, date_fin, location) 
                VALUES (
                    CAST($1 as INTEGER), 
                    CAST($2 as INTEGER), 
                    CAST($3 as INTEGER), 
                    CAST($4 as INTEGER), 
                    CAST($5 as INTEGER), 
                    $6, 
                    $7, 
                    true)`;
    values = [
      id,
      req.query.b_cid,
      req.query.b_hid,
      req.query.b_rid,
      req.query.b_nas,
      new Date(req.query.b_startDate).addHours(12),
      new Date(req.query.b_endDate).addHours(12),
    ];
    try {
    await pg.query(query, values);
    } catch (e) {
        res.send(e.message)
    }
    res.send(
      "Location créée.\nLe numéro de location est: " + id
    );
  },
};
