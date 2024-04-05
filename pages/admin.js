const viewChaines = async () => {
    const url = new URL(
        "https://" +
        window.location.hostname +
        "/queries/admin/viewChaines"
    );

    const res = await fetch(url);
    const json = await res.json();

    document.getElementById("chaineAnswer").innerHTML =
        interpretJson(json);
}

const viewHotels = async () => {
  const url = new URL(
    "https://" + window.location.hostname + "/queries/admin/viewHotels"
  );

  let params = handleParams(url, "search_h_ch_id");

  for (const param in params){
    if (!params[param]) return document.getElementById("hotelAnswer").innerHTML =
    "Veuillez spécifier la chaine hôtelière.";
  }

  const res = await fetch(url);
  const json = await res.json();

  document.getElementById("hotelAnswer").innerHTML = interpretJson(json);
};

const viewRooms = async () => {
  const url = new URL(
    "https://" + window.location.hostname + "/queries/admin/viewRooms"
  );

  let params = handleParams(url, "search_r_ch_id", "search_r_h_id");

  for (const param in params) {
    if (!params[param]) return document.getElementById("roomAnswer").innerHTML =
      "Veuillez spécifier la chaine et l'hôtel.";
  }

  const res = await fetch(url);
  const json = await res.json();

  document.getElementById("roomAnswer").innerHTML = interpretJson(json);
};

const viewEmployees = async () => {
  const url = new URL(
    "https://" + window.location.hostname + "/queries/admin/viewEmployees"
  );

  let params = handleParams(url, "search_e_ch_id", "search_e_h_id");

  for (const param in params) {
    if (!params[param]) return document.getElementById("employeeAnswer").innerHTML =
      "Veuillez spécifier la chaine et l'hôtel.";
  }

  const res = await fetch(url);
  const json = await res.json();

  document.getElementById("employeeAnswer").innerHTML = interpretJson(json);
};

const searchClient = async () => {
  const url = new URL(
    "https://" + window.location.hostname + "/queries/admin/searchClient"
  );

  let params = handleParams(url, "c_prenom", "c_nom");

  if (!params.c_nom && !params.c_prenom) return document.getElementById("clientAnswer").innerHTML =
    "Veuillez spécifier soit un nom, prenom ou les deux.";

  const res = await fetch(url);
  const json = await res.json();

  document.getElementById("clientAnswer").innerHTML = interpretJson(json);
};

const deleteChaine = async () => {
  const url = new URL(
    "https://" + window.location.hostname + "/queries/admin/deleteChaine"
  );

  let params = handleParams(url, "del_chaine_id");

  for (const param in params) {
    if (!params[param])
      return (document.getElementById("chaineAnswer").innerHTML =
        "Veuillez spécifier la chaine hôtelière.");
  }

  const res = await fetch(url);
  const text = await res.text();

  document.getElementById("chaineAnswer").innerHTML = text;
};

const deleteHotel = async () => {
  const url = new URL(
    "https://" + window.location.hostname + "/queries/admin/deleteHotel"
  );

  let params = handleParams(url, "del_hotel_ch_id", "del_hotel_h_id");

  for (const param in params) {
    if (!params[param])
      return (document.getElementById("hotelAnswer").innerHTML =
        "Veuillez spécifier la chaine et l'hôtel.");
  }

  const res = await fetch(url);
  const text = await res.text();

  document.getElementById("hotelAnswer").innerHTML = text;
};

const deleteRoom = async () => {
  const url = new URL(
    "https://" + window.location.hostname + "/queries/admin/deleteRoom"
  );

  let params = handleParams(url, "del_r_ch_id", "del_r_h_id", "del_r_num");

  for (const param in params) {
    if (!params[param])
      return (document.getElementById("roomAnswer").innerHTML =
        "Veuillez spécifier la chaine, l'hôtel et le numéro de chambre.");
  }

  const res = await fetch(url);
  const text = await res.text();

  document.getElementById("roomAnswer").innerHTML = text;
};

const deleteEmployee = async () => {
  const url = new URL(
    "https://" + window.location.hostname + "/queries/admin/deleteEmployee"
  );

  let params = handleParams(url, "del_e_nas");

  for (const param in params) {
    if (!params[param])
      return (document.getElementById("employeeAnswer").innerHTML =
        "Veuillez spécifier le NAS de l'employé.");
  }

  const res = await fetch(url);
  const text = await res.text();

  document.getElementById("employeeAnswer").innerHTML = text;
};

const deleteClient = async () => {
  const url = new URL(
    "https://" + window.location.hostname + "/queries/admin/deleteClient"
  );

  let params = handleParams(url, "del_c_nas");

  for (const param in params) {
    if (!params[param])
      return (document.getElementById("clientAnswer").innerHTML =
        "Veuillez spécifier le NAS du client.");
  }

  const res = await fetch(url);
  const text = await res.text();

  document.getElementById("clientAnswer").innerHTML = text;
};

const createChaine = async () => {
  const url = new URL(
    "https://" + window.location.hostname + "/queries/admin/createChaine"
  );

  let params = handleParams(
    url,
    "ch_nom",
    "ch_ville",
    "ch_province",
    "ch_rue",
    "ch_num",
    "ch_cp",
    "ch_tels",
    "ch_emails"
  );

  for (const param in params) {
    if (!params[param])
      return (document.getElementById("chaineAnswer").innerHTML =
        "Veuillez remplir tous les champs");
  }

  try {
    let addr_id = await createAdresse(
      params.ch_ville,
      params.ch_province,
      params.ch_rue,
      params.ch_num,
      params.ch_cp,
      params.ch_tels,
      params.ch_emails
    );
    url.searchParams.append("adresse_bc", addr_id);
    const res = await fetch(url);
    const text = await res.text();

    document.getElementById("chaineAnswer").innerHTML = text;
  } catch (e) {
    return (document.getElementById("chaineAnswer").innerHTML =
      e.message);
  }
};

const createHotel = async () => {
  const url = new URL(
    "https://" + window.location.hostname + "/queries/admin/createHotel"
  );

  let params = handleParams(
    url,
    "h_ch_id",
    "h_nom",
    "h_categorie",
    "h_zone",
    "h_rating",
    "h_ville",
    "h_province",
    "h_rue",
    "h_num",
    "h_cp",
    "h_tels",
    "h_emails"
  );

  for (const param in params) {
    if (!params[param])
      return (document.getElementById("hotelAnswer").innerHTML =
        "Veuillez remplir tous les champs");
  }

  try {
    let addr_id = await createAdresse(
      params.h_ville,
      params.h_province,
      params.h_rue,
      params.h_num,
      params.h_cp,
      params.h_tels,
      params.h_emails
    );
    url.searchParams.append("adresse", addr_id);
    const res = await fetch(url);
    const text = await res.text();

    document.getElementById("hotelAnswer").innerHTML = text;
  } catch (e) {
    return (document.getElementById("hotelAnswer").innerHTML = e.message);
  }
};