// .....................................................................
// ReglasREST.js
// .....................................................................
module.exports.cargar = function (servidorExpress, laLogica) {

    // .......................................................
    // GET /medida
    // .......................................................
    servidorExpress.get('/medida', async function (peticion, respuesta) {
        console.log(" * GET /medida ")
        // llamo a la función adecuada de la lógica
        let res = await laLogica.buscarMedida()
        // si el array de resultados no tiene personas ...
        if (res.length === 0) {
            // 404: not found
            respuesta.status(404).send("No encontré personas")
            return
        }
        // todo ok
        respuesta.send(JSON.stringify(res))
    }) // GET /persona

    // .......................................................
    // GET /asignatura
    // .......................................................
    servidorExpress.get('/asignatura', async function (peticion, respuesta) {
        console.log(" * GET /asignatura ")
        // llamo a la función adecuada de la lógica
        let res = await laLogica.buscarAsignatura()
        // si el array de resultados no tiene ...
        if (res.length === 0) {
            // 404: not found
            respuesta.status(404).send("no encontré asignaturas")
            return
        }
        // todo ok
        respuesta.send(JSON.stringify(res))
    }) // GET /asignatura

    // .......................................................
    // GET /profesor
    // .......................................................
    servidorExpress.get('/profesor', async function (peticion, respuesta) {
        console.log(" * GET /profesor ")
        // llamo a la función adecuada de la lógica
        let res = await laLogica.buscarProfesor()
        // si el array de resultados no tiene ...
        if (res.length === 0) {
            // 404: not found
            respuesta.status(404).send("no encontré profesores")
            return
        }
        // todo ok
        respuesta.send(JSON.stringify(res))
    }) // GET /profesor

    // .......................................................
    // GET /matricula/dni/<dni>
    // .......................................................
    servidorExpress.get('/matricula/dni/:dni', async function (peticion, respuesta) {
        console.log(" * GET /matricula/dni ")
        // averiguo el dni
        let dni = peticion.params.dni
        // llamo a la función adecuada de la lógica
        let res = await laLogica.buscarMatriculaPorDNI(dni)
        // si el array de resultados no tiene una casilla ...
        if (res.length !== 1) {
            // 404: not found
            respuesta.status(404).send("No encontré asignaturas con el dni: " + dni)
            return
        }
        // todo ok
        respuesta.send(JSON.stringify(res[0]))
    }) // get /matricula/dni

    // .......................................................
    // GET /asignatura/dni/<dni>
    // .......................................................
    servidorExpress.get('/asignatura/dni/:dni', async function (peticion, respuesta) {
        console.log(" * GET /asignatura/dni ")
        // averiguo el dni
        let dni = peticion.params.dni
        // llamo a la función adecuada de la lógica
        let res = await laLogica.buscarAsignaturasPorDNI(dni)
        // si el array de resultados no tiene una casilla ...
        if (res.length === 0) {
            // 404: not found
            respuesta.status(404).send("No encontré matriculas con el dni: " + dni)
            return
        }
        // todo ok
        respuesta.send(JSON.stringify(res))
    }) // GET /asignatura/dni

    // .......................................................
    // GET /persona/codigo/<codigo>
    // .......................................................
    servidorExpress.get('/persona/codigo/:codigo', async function (peticion, respuesta) {
        console.log(" * GET /persona/codigo ")
        // averiguo el dni
        let codigo = peticion.params.codigo
        // llamo a la función adecuada de la lógica
        let res = await laLogica.buscarPersonaPorCodigo(codigo)
        // si el array de resultados no tiene una casilla ...
        if (res.length === 0) {
            // 404: not found
            respuesta.status(404).send("No encontré personas con el codigo: " + codigo)
            return
        }
        // todo ok
        respuesta.send(JSON.stringify(res))
    }) // get /persona/codigo

    // .......................................................
    // GET /matricula/codigo/<codigo>
    // .......................................................
    servidorExpress.get('/matricula/codigo/:codigo', async function (peticion, respuesta) {
        console.log(" * GET /matricula/codigo ")
        // averiguo el codigo
        let codigo = peticion.params.codigo
        // llamo a la función adecuada de la lógica
        let res = await laLogica.buscarMatriculaPorCodigo(codigo)
        // si el array de resultados no tiene una casilla ...
        if (res.length === 0) {
            // 404: not found
            respuesta.status(404).send("No encontré matriculas con el codigo:" + codigo)
            return
        }
        // todo ok
        respuesta.send(JSON.stringify(res))
    }) // GET /matricula/codigo

    // .......................................................
    // GET /persona/curso/<codigo>
    // .......................................................
    servidorExpress.get('/persona/curso/:data', async function (peticion, respuesta) {
        console.log(" * GET /persona/curso ")
        // averiguo el codigo
        let data = peticion.params.data
        // llamo a la función adecuada de la lógica
        let datos = JSON.parse(data);
        let res = await laLogica.buscarMatriculaPorCurso(datos)
        // si el array de resultados no tiene una casilla ...
        if (res.length === 0) {
            // 404: not found
            respuesta.status(404).send("No encontré matriculas con: " + data)
            return
        }
        // todo ok
        respuesta.send(JSON.stringify(res))
    }) // GET /persona/curso

    // .......................................................
    // GET /imparte/dni/<dni>
    // .......................................................
    servidorExpress.get('/imparte/dni/:dni', async function (peticion, respuesta) {
        console.log(" * GET /imparte/dni ")
        // averiguo el codigo
        let dni = peticion.params.dni
        // llamo a la función adecuada de la lógica
        let res = await laLogica.buscarImpartes(dni)
        // si el array de resultados no tiene una casilla ...
        if (res.length === 0) {
            // 404: not found
            respuesta.status(404).send("No encontré asignaturas impartidas por:" + dni)
            return
        }
        // todo ok
        respuesta.send(JSON.stringify(res))
    }) // GET /imparte/dni

    // .......................................................
    // GET /carga/<dni>
    // .......................................................
    servidorExpress.get('/carga/:dni', async function (peticion, respuesta) {
        console.log(" * GET /carga/dni ")
        // averiguo el codigo
        let dni = peticion.params.dni
        // llamo a la función adecuada de la lógica
        let res = await laLogica.buscarImpartes(dni)
        let cargaAcual = 0;
        // si el array de resultados no tiene una casilla ...
        if (res.length === 0) {
            // 404: not found
            respuesta.send(JSON.stringify(cargaAcual))
            return
        }
        // todo ok
        for (var i = 0; i < res.length; i++) {
            cargaAcual += parseInt(res[i].creditos)
        }
        respuesta.send(JSON.stringify(cargaAcual))
    }) // GET /carga

    // .......................................................
    // GET /persona/nomatriculada/
    // .......................................................
    servidorExpress.get('/persona/nomatriculada', async function (peticion, respuesta) {
        console.log(" * GET persona/nomatriculada ")
        // llamo a la función adecuada de la lógica
        let res = await laLogica.buscarPersonasSinMatricula();
        if (res.length === 0) {
            // 404: not found
            respuesta.status(404).send("No encontré personas sin matricula")
            return
        }
        // todo ok
        respuesta.send(JSON.stringify(res))
    }) // GET persona/nomatriculada

    // .......................................................
    // GET /profesor/codigo/<codigo>
    // .......................................................
    servidorExpress.get('/profesor/codigo/:codigo', async function (peticion, respuesta) {
        console.log(" * GET /profesor/codigo ")
        // averiguo el dni
        let codigo = peticion.params.codigo
        // llamo a la función adecuada de la lógica
        let res = await laLogica.buscarProfesorCodigo(codigo)
        // si el array de resultados no tiene una casilla ...
        if (res.length === 0) {
            // 404: not found
            respuesta.status(404).send("No encontré profesor impartiendo: " + codigo)
            return
        }
        // todo ok
        respuesta.send(JSON.stringify(res))
    }) // get /profesor/codigo

    // .......................................................
    // POST /matricula/{<dni>,<codigo>,<nota>,<curso>}
    // .......................................................
    servidorExpress.post('/matricula/:data', async function (peticion, respuesta) {
        console.log(" * POST /matricula ")
        let data = peticion.params.data;
        let datos = JSON.parse(data);
        // llamo a la función adecuada de la lógica
        await laLogica.insertarMatricula(datos)
            .catch((err) => respuesta.status(404).send("No pude insertar la matricula: " + datos))//error
            .then(res => respuesta.status(200).send("Matricula insertada: " + datos))//todo ok
    }) // POST /matricula

    // .......................................................
    // POST /persona/{<dni>,<nombre>,<apellidos>}
    // .......................................................
    servidorExpress.post('/persona/:data', async function (peticion, respuesta) {
        console.log(" * POST /persona ")
        let data = peticion.params.data
        let datos = JSON.parse(data)
        // llamo a la función adecuada de la lógica
        await laLogica.insertarPersona(datos)
            .catch(err => respuesta.status(404).send("No pude insertar la asignatura: " + datos))//error
            .then(res => respuesta.status(200).send("Persona insertada: " + datos))//todo ok
    }) // post /persona

    // .......................................................
    // POST /asignatura/{<codigo>,<nombre>}
    // .......................................................
    servidorExpress.post('/asignatura/:data', async function (peticion, respuesta) {
        console.log(" * POST /asignatura ")
        let data = peticion.params.data
        let datos = JSON.parse(data)
        // llamo a la función adecuada de la lógica
        await laLogica.insertarAsignatura(datos)
            .catch((err) => respuesta.status(404).send("No pude insertar la asignatura: " + datos))//error
            .then(res => respuesta.status(200).send("Asignatura insertada: " + datos))//todo ok
    }) // post /asignatura

    // .......................................................
    // POST /profesor/{<dni>,<nombre>}
    // .......................................................
    servidorExpress.post('/profesor/:data', async function (peticion, respuesta) {
        console.log(" * POST /profesor ")
        let data = peticion.params.data
        let datos = JSON.parse(data)
        // llamo a la función adecuada de la lógica
        await laLogica.insertarProfesor(datos)
            .catch((err) => respuesta.status(404).send("No pude insertar el profesor: " + datos))//error
            .then(res => respuesta.status(200).send("Profesor insertado: " + datos))//todo ok
    }) // post /profesor

    // .......................................................
    // POST /profesor/{<dni>,<nombre>}
    // .......................................................
    servidorExpress.post('/profesor/:data', async function (peticion, respuesta) {
        console.log(" * POST /profesor ")
        let data = peticion.params.data
        let datos = JSON.parse(data)
        // llamo a la función adecuada de la lógica
        await laLogica.insertarProfesor(datos)
            .catch((err) => respuesta.status(404).send("No pude insertar el profesor: " + datos))//error
            .then(res => respuesta.status(200).send("Profesor insertado: " + datos))//todo ok
    }) // post /profesor

    // .......................................................
    // POST /imparte/{<dni>,<codigo>}
    // .......................................................
    servidorExpress.post('/imparte/:data', async function (peticion, respuesta) {
        console.log(" * POST /imparte ")
        let data = peticion.params.data
        let datos = JSON.parse(data)
        // llamo a la función adecuada de la lógica
        await laLogica.insertarImparte(datos)
            .catch((err) => respuesta.status(404).send("No pude crear el imparte: " + datos))//error
            .then(res => respuesta.status(200).send("Imparte creado correctamente: " + datos))//todo ok
    }) // post /imparte

    // .......................................................
    // PUT /profesor/{<dni>,<carga>}
    // .......................................................
    servidorExpress.put('/profesor/:data', async function (peticion, respuesta) {
        console.log(" * PUT /profesor ")
        let data = peticion.params.data
        console.log(data);
        let datos = JSON.parse(data)
        // llamo a la función adecuada de la lógica
        await laLogica.actualizarProfesor(datos)
            .catch((err) => respuesta.status(404).send("No pude actualiza el profesor: " + datos))//error
            .then(res => respuesta.status(200).send("Profesor actualizado: " + datos))//todo ok
    }) // PUT /profesor

    // .......................................................
    // PUT /persona/{<dni>,<nombre>,<apellidos>}
    // .......................................................
    servidorExpress.put('/persona/:data', async function (peticion, respuesta) {
        console.log(" * PUT /persona ")
        let data = peticion.params.data
        let datos = JSON.parse(data)
        // llamo a la función adecuada de la lógica
        await laLogica.actualizarPersona(datos)
            .catch((err) => respuesta.status(404).send("No pude actualiza la persona: " + datos))//error
            .then(res => respuesta.status(200).send("Persona actualizada: " + datos))//todo ok
    }) // PUT /persona

    // .......................................................
    // PUT /asignatura/{<dni>,<nombre>,<apellidos>}
    // .......................................................
    servidorExpress.put('/asignatura/:data', async function (peticion, respuesta) {
        console.log(" * PUT /asignatura ")
        let data = peticion.params.data
        let datos = JSON.parse(data)
        // llamo a la función adecuada de la lógica
        await laLogica.actualizarAsignatura(datos)
            .catch((err) => respuesta.status(404).send("No pude actualizar la asignatura: " + datos))//error
            .then(res => respuesta.status(200).send("Asignatura actualizada: " + datos))//todo ok
    }) // PUT /asignatura

    // .......................................................
    // DELETE /persona/<dni>
    // .......................................................
    servidorExpress.delete('/persona/:dni', async function (peticion, respuesta) {
        console.log(" * DELETE /persona ")
        let dni = peticion.params.dni
        // llamo a la función adecuada de la lógica
        await laLogica.borrarPersona(dni)
            .catch((err) => respuesta.status(404).send("No pude borrar la persona: " + dni))//error
            .then(res => respuesta.status(200).send("Persona persona: " + dni))//todo ok
    }) // DELETE /persona

    // .......................................................
    // DELETE /asigantura/<codigo>
    // .......................................................
    servidorExpress.delete('/asignatura/:codigo', async function (peticion, respuesta) {
        console.log(" * DELETE /asignatura ")
        let codigo = peticion.params.codigo
        // llamo a la función adecuada de la lógica
        await laLogica.borrarAsignatura(codigo)
            .catch((err) => respuesta.status(404).send("No pude borrar la asignatura: " + codigo))//error
            .then(res => respuesta.status(200).send("Asignatura borrada: " + codigo))//todo ok
    }) // DELETE /asigantura

    // .......................................................
    // DELETE /profesor/<dni>
    // .......................................................
    servidorExpress.delete('/profesor/:dni', async function (peticion, respuesta) {
        console.log(" * DELETE /profesor ")
        let dni = peticion.params.dni
        // llamo a la función adecuada de la lógica
        await laLogica.borrarProfesor(dni)
            .catch((err) => respuesta.status(404).send("No pude borrar el profesor: " + dni))//error
            .then(res => respuesta.status(200).send("Profesor borrado: " + dni))//todo ok
    }) // DELETE /profesor

    // .......................................................
    // DELETE /matricula/<data>
    // .......................................................
    servidorExpress.delete('/matricula/:data', async function (peticion, respuesta) {
        console.log(" * DELETE /matricula ")
        let data = peticion.params.data
        // llamo a la función adecuada de la lógica
        console.log(data)
        let datos = JSON.parse(data)
        console.log(datos)
        await laLogica.borrarMatricula(datos)
            .catch((err) => respuesta.status(404).send("No pude borrar la matricula con el codigo: " + data))//error
            .then(res => respuesta.status(200).send("Matricula borrada con codigo: " + data))//todo ok
    }) // DELETE /matricula/<codigo>

    // .......................................................
    // DELETE /imparte/<codigo>
    // .......................................................
    servidorExpress.delete('/imparte/:codigo', async function (peticion, respuesta) {
        console.log(" * DELETE /imparte ")
        let codigo = peticion.params.codigo
        // llamo a la función adecuada de la lógica
        await laLogica.borrarImparte(codigo)
            .catch((err) => respuesta.status(404).send("No pude borrar el imparte con el dni: " + codigo))//error
            .then(res => respuesta.status(200).send("Imparte borrado con dni: " + codigo))//todo ok
    }) // DELETE /imparte/<codigo>

} // cargar()
// .....................................................................
// .....................................................................
