export default {
  run: async (req, res, pg) => {
    let id = parseInt(new Date().getTime().toString().substring(4));

    let query = `INSERT INTO adresse(id_adresse, ville, province, rue, num_rue, code_postal) 
                VALUES (
                    CAST($1 as INTEGER), 
                    $2, 
                    $3,
                    $4,
                    CAST($5 as INTEGER),
                    $6
                    )`;
    let values = [
      id,
      req.query.ville,
      req.query.province,
      req.query.rue,
      req.query.num_rue,
      req.query.code_postal
    ];
    try {
        await pg.query(query, values);
// TODO ADD TRY CATCH IN LOCAL FOR EACH SCOPE OR CONVERT FOR EACH TO FOR OF LOOP
        let num_tels = req.query.num_tels.split(";")
        let num_query = `INSERT INTO num_tel(numero, id_adresse) VALUES ($1, CAST($2 as INTEGER))`
        num_tels.forEach(async num_tel => {
            await pg.query(num_query, [String(parseInt(num_tel)), id])
        })

        let emails = req.query.emails.split(";");
        let emails_query = `INSERT INTO email(email, id_adresse) VALUES ($1, CAST($2 as INTEGER))`;
        emails.forEach(async (email) => {
            console.log(email)
            await pg.query(emails_query, [email, id]);
        });
    } catch (e) {
        query = `DELETE FROM adresse WHERE id_adresse = CAST($1 as INTEGER)`;
        await pg.query(query, [id]);
        return res.send("ERROR: " + e.message);
    }

    res.send(String(id));
  },
};
