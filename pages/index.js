Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

const interpretJson = (json) => {
  let data = "";
  let i = 1;
  json.forEach((row) => {
    data += '<span style="font-weight: bold;">Résultat #' + i++ + "</span><br>";
    for (const val in row) {
      data +=
        '<span style="font-style: italic;">' +
        val +
        "</span>: " +
        row[val] +
        "<br>";
    }
    data += "<hr><br>";
  });

  return data;
};

const handleParams = (url, ...params) => {
  let res = {};
  params.forEach((param) => {
    let val = document.getElementById(param).value;
    url.searchParams.append(param, val);
    res[param] = val;
  });
  return res;
};

const createAdresse = async (ville, province, rue, num_rue, code_postal, num_tels, emails) => {
    const url = new URL(
    "https://" +
      window.location.hostname +
      "/queries/admin/createAdresse"
  );

  url.searchParams.append("ville", ville);
  url.searchParams.append("province", province);
  url.searchParams.append("rue", rue);
  url.searchParams.append("num_rue", num_rue);
  url.searchParams.append("code_postal", code_postal);
  url.searchParams.append("num_tels", num_tels);
  url.searchParams.append("emails", emails);

  const res = await fetch(url);
  const text = await res.text();

  if (text.startsWith("ERROR:") || text.startsWith("error:")){
    throw new Error(text)
  }

  return parseInt(text);
};
