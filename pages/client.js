const searchRooms = async () => {
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
    return (document.getElementById("searchRoomAnswer").innerHTML =
      "Les dates de début et de fin sont obligatoires");
  }
  if (new Date(startDate) > new Date(endDate)) {
    return (document.getElementById("searchRoomAnswer").innerHTML =
      "La date de début doit être avant la date de fin");
  }

  console.log("Test");

  const res = await fetch(url);
  const json = await res.json();

  document.getElementById("searchRoomAnswer").innerHTML =
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
    data += `<br><button type="button" onclick="bookButton(${val[chaineid]},${val[chaine]},${val[hotelid]},${val[hotel]},${val[chambre]})">Réserver cette chambre</button>`;
    data += "<hr><br>";
  });

  return data;
};

const bookButton = (
  num_chaine,
  nom_chaine,
  num_hotel,
  nom_hotel,
  num_chambre
) => {
    document.getElementById("res_debut").innerHTML =
      document.getElementById("startDate").value;
    document.getElementById("res_fin").innerHTML =
      document.getElementById("endDate").value;
    document.getElementById("nom_chaine").innerHTML = nom_chaine;
    document.getElementById("res_chaine").innerHTML = num_chaine;
    document.getElementById("nom_hotel").innerHTML = nom_hotel;
    document.getElementById("res_hotel").innerHTML = num_hotel;
    document.getElementById("res_room").innerHTML = num_chambre;
};

const bookQuery = async () => {
  const url = new URL(
    "https://" + window.location.hostname + "/queries/client/bookRoom"
  );

  let params = ["res_debut", "res_fin", "res_chaine", "res_hotel", "res_room"];

  let paramValues = {};
  params.forEach((param) => {
    let val = document.getElementById(param).innerHTML;
    url.searchParams.append(param, val);
    paramValues[param] = val;
  });

  let NAS = document.getElementById("res_nas").value;
  url.searchParams.append("res_nas", NAS);

  if (!paramValues.startDate) {
    return (document.getElementById("bookAnswer").innerHTML =
      "Veuillez choisir une chambre à réserver avec le menu plus haut");
  }

  if (!NAS) {
    return (document.getElementById("bookAnswer").innerHTML =
      "Veuillez entrer votre numéro d'assurance sociale");
  }

  const res = await fetch(url);
  const text = await res.text();

  document.getElementById("bookAnswer").innerHTML = text;
};
