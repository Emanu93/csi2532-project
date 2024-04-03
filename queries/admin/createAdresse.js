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
      req.query.code_postal,
    ];
    try {
      await pg.query(query, values);
      let num_tels = req.query.num_tels.split(";");
      let num_query = `INSERT INTO num_tel(numero, id_adresse) VALUES ($1, CAST($2 as INTEGER))`;
      for (const num_tel of num_tels) {
        await pg.query(num_query, [String(parseInt(num_tel)), id]);
      }

      let emails = req.query.emails.split(";");
      let emails_query = `INSERT INTO email(email, id_adresse) VALUES ($1, CAST($2 as INTEGER))`;
      for (const email of emails) {
        console.log(email);
        await pg.query(emails_query, [email, id]);
      }
    } catch (e) {
      let query1 = `DELETE FROM num_tel WHERE id_adresse = CAST($1 as INTEGER);`;
      let query2 = `DELETE FROM email WHERE id_adresse = CAST($1 as INTEGER); `;
      let query3 = `DELETE FROM adresse WHERE id_adresse = CAST($1 as INTEGER);`;
      await pg.query(query1, [id]);
      await pg.query(query2, [id]);
      await pg.query(query3, [id]);
      return res.send(
        "ERROR: " +
          e.message +
          "<br><br>Assurez-vous:<br>- Que tous les champs respectent le format prescrit<br>- Que cette adresse, numéro de téléphone ou email n'existe pas déjà dans la base de données"
      );
    }

    res.send(String(id));
  },
};
