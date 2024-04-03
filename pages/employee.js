const callReservationNumber = async () => {
  const url = new URL(
    "https://" +
      window.location.hostname +
      "/queries/employee/getReservationName"
  );

  let params = handleParams(url, "resId");

  if (params.resId == "") return;

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
