const interpretJson = (json) => {
    let data = "";
    let i = 1;
    json.forEach(row => {
        data += '<span style="font-weight: bold;">Résultat #' + i++ + "</span><br>";
        for (const val in row){
            data += "<span style=\"font-style: italic;\">" + val + "</span>: " + row[val] + "<br>";
        }
        data += "<hr><br>"
    })

    return data;
}

const handleParams = (url, ...params) => {
    let res = {};
    params.forEach(param => {
        let val = document.getElementById(param).value;
        url.searchParams.append(param, val);
        res[param] = val;
    })
    return res;
}

const getAddress = (pg, id) => {
    
}