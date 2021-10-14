let lista;
let select;

function setup(idL,idS){
    lista = document.getElementById(idL);
    select = document.getElementById(idS);
    actualizarLista();

}


/**
 * Llenar el elemento id con divs de los valores
 *
 * @param medidas
 */
function llenarLista(medidas = []) {


    lista.innerHTML = "";

    if(medidas.length > 0){
        medidas.forEach(function (item) {
            lista.innerHTML += crearDiv(item.fecha, item.valor, item.lat, item.lon);
        })
    }else {
        lista.innerHTML = "No hay datos"
    }

}

/**
 * Crea un div con los valores
 *
 * @param hora
 * @param valor
 * @param lat
 * @param lon
 */
function crearDiv(hora, valor, lat, lon) {

    let div;
    div = "<div class=\"card " + elegirTipo(valor) + " mb-3\">" +
        "<div class=\"card-body\">" +
        "<div class=\"row\">" +
        "<div class=\"col-2 datoCentrado\">" + hora + "</div>" +
        "<div class=\"col-2 datoCentrado\">" + valor + "</div>" +
        "<div class=\"col-8\">" +
        "<div class=\"vstack\">" +
        "<div>" + lat + "</div>" +
        "<div>" + lon + "</div>" +
        "</div>" +
        "</div>" +
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
function elegirTipo(valor) {
    let tipo;

    if (valor > 100) {
        tipo = "bg-danger text-light"
    } else if (valor < 50) {
        tipo = "bg-success text-light"
    } else {
        tipo = "bg-warning"
    }
    return tipo;
}



function actualizarLista() {

    let cuantas = select.value;
    logicaFake.obtenerUltimasMediciones(cuantas,llenarLista);

    select.addEventListener("change", function () {
        let cuantas = select.value;

        if(cuantas > 0 ){
            logicaFake.obtenerUltimasMediciones(cuantas,llenarLista)
        }else {
            logicaFake.obtenerTodasLasMediciones(llenarLista)
        }

    })

}