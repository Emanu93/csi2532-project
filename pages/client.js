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
    data += `<br><button type="button" onclick="bookButton(${row["chaineid"]},'${row["chaine"]}',${row["hotelid"]},'${row["hotel"]}',${row["chambre"]})">Réserver cette chambre</button>`;
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
    document.getElementById("bookAnswer").scrollIntoView();
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

  if (!paramValues.res_debut) {
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

const populateChaines = async () => {
    const url = new URL(
      "https://" + window.location.hostname + "/queries/client/getChaines"
    );

    const res = await fetch(url);
    const json = await res.json();

    json.forEach(chaine => {
        document.getElementById("chaines").innerHTML += `<option value="${chaine.nom}"></option>\n`
    })
}

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

const createAccountButton = async () => {
    
    const url = new URL(
      "https://" + window.location.hostname + "/queries/client/createAccount"
    );

    let params = handleParams(
      url,
      "acc_prenom",
      "acc_nom",
      "acc_nas",
      "acc_ville",
      "acc_province",
      "acc_rue",
      "acc_num",
      "acc_cp",
      "acc_tels",
      "acc_emails"
    );

    for (const param in params) {
      if (!params[param])
        return (document.getElementById("createAccountAnswer").innerHTML =
          "Veuillez remplir tous les champs");
    }

    try {
        let addr_id = await createAdresse(params.acc_ville, params.acc_province, params.acc_rue, params.acc_num, params.acc_cp, params.acc_tels, params.acc_emails);
        url.searchParams.append("addr_id", addr_id);
        const res = await fetch(url);
        const text = await res.text();

        document.getElementById("createAccountAnswer").innerHTML = text;
    } catch (e) {
        return document.getElementById("createAccountAnswer").innerHTML = e.message;
    }
}

window.onload = () => {
    populateChaines();
    populateCategories();
}