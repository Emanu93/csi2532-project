export default {
  run: async (req, res, pg) => {
    let query = `SELECT 
        reservation.id as ReservationID, 
        client.prenom as Prenom, 
        client.nom as Nom, 
        chaine.nom as chaine,
        hotel.nom as hotel,
        num_chambre as chambre,
        date_debut as Debut, 
        date_fin as Fin, 
        location as Payé 
      FROM reservation, client, hotel, chaine_hotel as chaine
      WHERE reservation.id = CAST($1 as INTEGER)
        AND client.nas = reservation.nas_client
        AND (reservation.num_hotel, reservation.num_chaine) = (hotel.num_hotel, hotel.num_chaine)
        AND reservation.num_chaine = chaine.num_chaine;
      `;
    let values = [req.query.resId];

    console.log(values)

    let data = await pg.query(query, values);
    console.log(data.rows)
    res.send(data.rows);
  },
};
