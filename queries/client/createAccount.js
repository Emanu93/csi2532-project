export default {
  run: async (req, res, pg) => {
    let query = "SELECT * FROM Client WHERE nas = CAST($1 AS INTEGER)";
    let values = [req.query.acc_nas];

    let data = await pg.query(query, values);
    if (!!data.rows[0]) {
      console.log(data);
      return res.send(
        "Il y a déjà un compte associé à ce numéro d'assurance sociale."
      );
    }

    query = `INSERT INTO client(nas, nom, prenom, adresse, date_enregistrement)
                VALUES (
                    CAST($1 as INTEGER),
                    $2,
                    $3,
                    CAST($4 as INTEGER),
                    NOW()
                )`;
    values = [
      req.query.acc_nas,
      req.query.acc_nom,
      req.query.acc_prenom,
      req.query.addr_id
    ];

    try {
      await pg.query(query, values);
    } catch (e) {
      return res.send(e.message);
    }
    res.send("Votre compte a été créé.");
  },
};
