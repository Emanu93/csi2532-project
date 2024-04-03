export default {
    run: async (req, res, pg) => {
        let query = `
        SELECT reservation.id as ReservationID, 
            client.prenom as Prenom, 
            client.nom as Nom, 
            chaine.nom as chaine,
            hotel.nom as hotel,
            num_chambre as chambre,
            date_debut as Debut, 
            date_fin as Fin, 
            location as Payé 
        FROM reservation, client, chaine_hotel as chaine, hotel
        WHERE (reservation.num_hotel, reservation.num_chaine) = (hotel.num_hotel, hotel.num_chaine)
            AND client.nas = reservation.nas_client
            AND reservation.num_chaine = chaine.num_chaine
            AND ('null' like $1 OR client.nom like $1) AND ('null' like $2 OR client.prenom like $2)`;
        let values = [req.query.clientNom || "null", req.query.clientPN || "null"];

        let data = await pg.query(query, values);
        res.send(data.rows);
    }
}