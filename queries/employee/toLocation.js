export default {
  run: async (req, res, pg) => {  
    let query = `
    SELECT * FROM reservation WHERE id = CAST($1 as INTEGER);
    `
    let values = [req.query.loc_resId];

    let data = await pg.query(query, values)

    if (!data.rows[0]){
        return res.send("La réservation " + values[0] + " n'a pas été trouvée dans la base de données.")
    }
    
    query = `
        UPDATE reservation
        SET location = true
        WHERE id = CAST($1 as INTEGER);
      `;

    await pg.query(query, values);
    res.send("La réservation " + values[0] + " a été transformée en location.");
  },
};
