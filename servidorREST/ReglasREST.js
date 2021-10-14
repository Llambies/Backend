// .....................................................................
// ReglasREST.js
// .....................................................................
module.exports.cargar = function (servidorExpress, laLogica) {

    // .......................................................
    // GET /medida/cuantas/<cuantas>
    // .......................................................
    servidorExpress.get('/medida/cuantas/:cuantas', async function (peticion, respuesta) {
        console.log(" * GET /medida/cuantas ")
        // averiguo cuantas
        let cuantas = peticion.params.cuantas
        // llamo a la función adecuada de la lógica
        let res = await laLogica.obtenerUltimasMediciones(cuantas)
        // si el array de resultados no tiene personas ...
        if (res.length === 0) {
            // 404: not found
            respuesta.status(404).send("No encontré medidas")
            return
        }
        // todo ok
        respuesta.send(JSON.stringify(res))
    }) // GET /medida/cuantas
    // .......................................................

    // .......................................................
    // GET /medida
    // .......................................................
    servidorExpress.get('/medida', async function (peticion, respuesta) {
        console.log(" * GET /medida ")
        // llamo a la función adecuada de la lógica
        let res = await laLogica.obtenerTodasLasMediciones()
        // si el array de resultados no tiene personas ...
        if (res.length === 0) {
            // 404: not found
            respuesta.status(404).send("No encontré medidas")
            return
        }
        // todo ok
        respuesta.send(JSON.stringify(res))
    }) // GET /medida
    // .........................................

    // .......................................................
    // POST /medida/{<fecha>,<valor>,<lat>,<lon>}
    // .......................................................
    servidorExpress.post('/medida/:data', async function (peticion, respuesta) {
        console.log(" * POST /medida ")
        let data = peticion.params.data
        let datos = JSON.parse(data)
        // llamo a la función adecuada de la lógica
        await laLogica.insertarMedida(datos)
            .catch(err => respuesta.status(404).send("No pude insertar la medida: " + datos))//error
            .then(res => respuesta.status(200).send("Medida insertada: " + datos))//todito ok
    }) // post /medida

} // cargar()
// .....................................................................
// .....................................................................
