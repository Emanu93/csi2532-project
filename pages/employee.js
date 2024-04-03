const callReservationNumber = async () => {
  const url = new URL(
    "https://" +
      window.location.hostname +
      "/queries/employee/getReservationNumber"
  );

  let params = handleParams(url, "resId");

  if (!params.resId) return;

  const res = await fetch(url);
  const json = await res.json();

  document.getElementById("searchReservationAnswer").innerHTML =
    interpretJson(json);
};

const callReservationName = async () => {
  const url = new URL(
    "https://" +
      window.location.hostname +
      "/queries/employee/getReservationName"
  );

  let params = handleParams(url, "clientPN", "clientNom");

  if (params.clientPN == "" && params.clientNom == "") return;

  const res = await fetch(url);
  const json = await res.json();

  document.getElementById("searchReservationAnswer").innerHTML =
    interpretJson(json);
};

const toLocationButton = async () => {
  const url = new URL(
    "https://" +
      window.location.hostname +
      "/queries/employee/toLocation"
  );

  let params = handleParams(url, "loc_resId");

  if (!params.loc_resId) return;

  const res = await fetch(url);
  const text = await res.text();

  document.getElementById("locationAnswer").innerHTML =
    text;
}

const createLocationButton = async () => {
  const url = new URL(
    "https://" + window.location.hostname + "/queries/employee/createLocation"
  );

  let params = handleParams(url, "b_cid", "b_hid", "b_rid", "b_startDate", "b_endDate", "b_nas");

  for (const param in params){
    if (!params[param]) return document.getElementById("createLocationAnswer").innerHTML = "Veuillez remplir tous les champs";
  }

  const res = await fetch(url);
  const text = await res.text();

  document.getElementById("createLocationAnswer").innerHTML = text;
}

const employeeSearchRooms = async () => {
  const url = new URL(
    "https://" + window.location.hostname + "/queries/client/searchRooms"
  );

  let params = handleParams(
    url,
    "startDate",
    "endDate",
    "capacity",
    "size",
    "chaine",
    "categorie",
    "rating",
    "amountRooms",
    "price"
  );

  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;

  if (!startDate || !endDate) {
    return (document.getElementById("employeeSearchRoomAnswer").innerHTML =
      "Les dates de début et de fin sont obligatoires");
  }
  if (new Date(startDate) > new Date(endDate)) {
    return (document.getElementById("employeeSearchRoomAnswer").innerHTML =
      "La date de début doit être avant la date de fin");
  }

  const res = await fetch(url);
  const json = await res.json();

  document.getElementById("employeeSearchRoomAnswer").innerHTML =
    interpretJsonWithButton(json);
};

const interpretJsonWithButton = (json) => {
  let data = "";
  let i = 1;
  json.forEach((row) => {
    data += '<span style="font-weight: bold;">Résultat #' + i++ + "</span><br>";
    for (const val in row) {
      if (val == "hotelid" || val == "chaineid") {
        continue;
      }
      data +=
        '<span style="font-style: italic;">' +
        val +
        "</span>: " +
        row[val] +
        "<br>";
    }
    data += `<br><button type="button" onclick="bookButton(${row["chaineid"]},${row["hotelid"]},${row["chambre"]})">Sélectionner cette chambre</button>`;
    data += "<hr><br>";
  });

  return data;
};

const bookButton = (
  num_chaine,
  num_hotel,
  num_chambre
) => {
  document.getElementById("b_startDate").value =
    document.getElementById("startDate").value;
  document.getElementById("b_endDate").value =
    document.getElementById("endDate").value;
  document.getElementById("b_cid").value = num_chaine;
  document.getElementById("b_hid").value = num_hotel;
  document.getElementById("b_rid").value = num_chambre;
  document.getElementById("createLocationAnswer").scrollIntoView();
};

const populateChaines = async () => {
  const url = new URL(
    "https://" + window.location.hostname + "/queries/client/getChaines"
  );

  const res = await fetch(url);
  const json = await res.json();

  json.forEach((chaine) => {
    document.getElementById(
      "chaines"
    ).innerHTML += `<option value="${chaine.nom}"></option>\n`;
  });
};

const populateCategories = async () => {
  const url = new URL(
    "https://" + window.location.hostname + "/queries/client/getCategories"
  );

  const res = await fetch(url);
  const json = await res.json();

  json.forEach((categorie) => {
    document.getElementById(
      "categories"
    ).innerHTML += `<option value="${categorie.categorie}"></option>\n`;
  });
};

window.onload = () => {
  populateChaines();
  populateCategories();
}