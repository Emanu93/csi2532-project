export default {
  run: async (req, res, pg) => {
    let query = `SELECT chaine.nom as Chaine, 
        hotel.nom as Hotel, 
        room.num_chambre as chambre, 
        adresse_string(hotel.adresse) as adresse,
        hotel.classement as classement, 
        room.capacite as capacite, 
        room.vue as vue, 
        room.problemes as problemes, 
        room.superficie as superficie, 
        room.peut_etendre, 
        room.prix,

        hotel.num_hotel as hotelid,
        chaine.num_chaine as chaineid
      
      FROM Chaine_Hotel as chaine, Hotel, Chambre as room 
      
      WHERE room.num_hotel = hotel.num_hotel AND hotel.num_chaine = chaine.num_chaine
        AND ($1 >= all (SELECT date_fin FROM reservation WHERE date_debut <= $2
            AND (num_chambre, num_hotel, num_chaine) = (room.num_chambre, hotel.num_hotel, chaine.num_chaine)))
        AND ($2 <= all (SELECT date_debut FROM reservation WHERE date_fin >= $1
            AND (num_chambre, num_hotel, num_chaine) = (room.num_chambre, hotel.num_hotel, chaine.num_chaine)))
        AND (capacite >= CAST($3 AS INTEGER))
        AND (room.superficie >= CAST($4 AS INTEGER))
        AND ($5 like 'null' OR chaine.nom like $5)
        AND ($6 like 'null' OR hotel.categorie like $6)
        AND (hotel.classement >= CAST($7 AS NUMERIC(2,1)))
        AND (CAST($8 AS INTEGER) = 0 OR (SELECT count(*) FROM chambre NATURAL JOIN hotel as h2 WHERE hotel.num_hotel = h2.num_hotel) >= CAST($8 AS INTEGER))
        AND (room.prix <= CAST($9 AS INTEGER))
      `;
    let values = [
      (new Date(req.query.startDate)).addHours(12),
      (new Date(req.query.endDate)).addHours(12),
      parseInt(req.query.capacity || "0"),
      parseInt(req.query.size || "0"),
      req.query.chaine || "null",
      req.query.categorie || "null",
      parseInt(req.query.rating || "1"),
      parseInt(req.query.amountRooms || "0"),
      parseInt(req.query.price || "100000"),
    ];

    values.forEach((val) => console.log(typeof val + " " + val));

    let data = await pg.query(query, values);
    res.send(data.rows);
  },
};
