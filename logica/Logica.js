// .....................................................................
// Logica.js
// .....................................................................
const sqlite3 = require("sqlite3")
// .....................................................................
// .....................................................................
module.exports = class Logica {
    // .................................................................
    // nombreBD: Texto
    // -->
    // constructor () -->
    // .................................................................
    constructor(nombreBD, cb) {
        this.laConexion = new sqlite3.Database(
            nombreBD,
            (err) => {
                if (!err) {
                    this.laConexion.run("PRAGMA foreign_keys = ON")
                }
                cb(err)
            })
    } // ()
    // .................................................................
    // nombreTabla:Texto
    // -->
    // borrarFilasDe() -->
    // .................................................................
    borrarFilasDe(tabla) {
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(
                "delete from " + tabla + ";",
                (err) => (err ? rechazar(err) : resolver())
            )
        })
    } // ()
    // .................................................................
    // borrarFilasDeTodasLasTablas() -->
    // .................................................................
    async borrarFilasDeTodasLasTablas() {
        await this.borrarFilasDe("Medida")
    } // ()

    // .................................................................
    // datos:{fecha:Texto, valor:N, lat:Texto: lon:Texto}
    // -->
    // insertarMedida() -->
    // .................................................................
    insertarMedida(datos) {
        let textoSQL =
            'insert into Medida ("fecha","valor","lat","lon") values ($fecha, $valor, $lat, $lon);'
        let valoresParaSQL = {
            $fecha: datos.fecha, $valor: datos.valor,
            $lat: datos.lat, $lon: datos.lon
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    // buscarMedida() <--
    // <--
    // [{id:N, fecha:Texto,  valor:N,  lat:Texto,  lon:Texto}]
    // .................................................................
    obtenerTodasLasMediciones() {
        let textoSQL = "select * from Medida ORDER BY id ";
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })

    } // ()

    // .................................................................
    // N : cuantas
    // -->
    // buscarMedida() <--
    // <--
    // [{id:N, fecha:Texto,  valor:N,  lat:Texto,  lon:Texto}]
    // .................................................................
    obtenerUltimasMediciones(cuantas) {
        let textoSQL = "select * from Medida ORDER BY id DESC LIMIT $cuantas ";
        let valoresParaSQL = {
            $cuantas: cuantas
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()

    // .................................................................
    // cerrar() -->
    // .................................................................
    cerrar() {
        return new Promise((resolver, rechazar) => {
            this.laConexion.close((err) => {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
} // class
// .....................................................................
// .....................................................................
