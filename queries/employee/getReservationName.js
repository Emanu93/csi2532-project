export default {
    run: async (req, res, pg) => {
        let query = "SELECT reservation.id as ReservationID, client.prenom as Prenom, client.nom as Nom, date_debut as Debut, date_fin as Fin, location as Payé FROM reservation NATURAL INNER JOIN client WHERE ('null' like $1 OR client.nom like $1) AND ('null' like $2 OR client.prenom like $2)"
        let values = [req.query.clientNom || "null", req.query.clientPN || "null"];

        values.forEach(val => console.log(val))

        let data = await pg.query(query, values);
        res.send(data.rows);
    }
}