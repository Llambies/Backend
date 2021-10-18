/**
 *
 * mainTest1.js
 *
 * AUTOR: Adrian Maldonado Llambies
 * FECHA: 17/10/2021
 * DESCRIPCION: Test de la clase Logica
 *
 */
const Logica = require("../Logica.js")
var assert = require('assert')
// ........................................................
// main ()
// ........................................................
describe("Test 1: insertar una medida", function () {
// ....................................................
// ....................................................
    var laLogica = null
// ....................................................
// ....................................................
    it("conectar a la base de datos", function (hecho) {
        laLogica = new Logica(
            "../bd/datos.bd",
            function (err) {
                if (err) {
                    throw new Error("No he podido conectar con datos.db")
                }
                hecho()
            })
    }) // it
// ....................................................
// ....................................................
    it("borrar todas las filas", async function () {
        await laLogica.borrarFilasDeTodasLasTablas()
    }) // it
// ....................................................
// ....................................................
    it("puedo insertar una medida",
        async function () {
            await laLogica.insertarMedida(
                {
                    id : 1, fecha: "123", valor: 44,
                    lat: "N", lon: "E"
                })
            var res = await laLogica.obtenerTodasLasMediciones()
            assert.equal(res.length, 1, "¿no hay un resulado?")
            assert.equal(res[0].id, "1", "¿no es 1?")
            assert.equal(res[0].lat, "N", "¿no es N?")
            assert.equal(res[0].lon, "E", "¿no es E?")
            assert.equal(res[0].valor, "44", "¿no es 44?")
        }) // it
// ....................................................
// ....................................................
    it("no puedo insertar una medida con id que ya está",
        async function () {
            var error = null
            try {
                await laLogica.insertarPersona(
                    {
                        id : 1, fecha: "1634522083911", valor: 44,
                        lat: "García", lon: "García"
                    })
            } catch (err) {
                error = err
            }
            assert(error, "¿Ha insertado el id que ya estaba 1234A? (¿No ha pasado por el catch()?")
        }) // it
// ....................................................
// ....................................................
    it("cerrar conexión a la base de datos",
        async function () {
            try {
                await laLogica.cerrar()
            } catch (err) {
                throw new Error("cerrar conexión a BD fallada: " + err)
            }
        }) // it
}) // describe
