/**
 * test
 */
function test(){

    console.log("test")
}

/**
 * Llenar el elemento id con divs de los valores
 *
 * @param id
 */
function llenarLista(id){
    let lista = document.getElementById(id)

    //todo: valores reales
    lista.innerHTML = crearDiv("12:54",905,"latitud","longitud");
}

/**
 * Crea un div con los valores
 *
 * @param hora
 * @param valor
 * @param lat
 * @param lon
 */
function crearDiv(hora, valor, lat, lon){

    let div;
    div ="<div class=\"card " + elegirTipo(valor) + " mb-3\">"+
        "<div class=\"card-body\">" +
        "<div class=\"row\">" +
        "<div class=\"col-2 datoCentrado\">" + hora + "</div>"+
        "<div class=\"col-2 datoCentrado\">" + valor + "</div>"+
        "<div class=\"col-8\">" +
        "<div class=\"vstack\">" +
        "<div>" + lat + "</div>"+
        "<div>" + lon + "</div>"+
        "</div>"+
        "</div>"+
        "</div>"


    //console.log(div)
    return div;
}

/**
 * Devuelve el tipo del div segun el valor
 *
 * @param valor
 * @returns {string}
 */
function elegirTipo(valor){
    let tipo;

    if(valor>100){
        tipo = "bg-danger text-light"
    }else if(valor<50){
        tipo = "bg-success"
    }else{
        tipo = "bg-warning"
    }
    return tipo;
}


function listarMedidas(id) {

    let lista = document.getElementById(id)
    let url = "http://localhost:8080/medida";

    fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(function (err) {
            console.log('Fetch fallido ' + err);
            lista.innerHTML = "No existen medidas";
        })
        .then(function (res) {
                res.forEach(function (item) {
                    console.log(item)
                    lista.innerHTML += crearDiv(item.fecha,item.valor,item.lat,item.lon);
                })
            }
        )
}