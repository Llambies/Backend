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
        await this.borrarFilasDe("medida")
    } // ()
    // .................................................................
    // datos:{dni:Texto, nombre:Texto: apellidos:Texto}
    // -->
    // insertarPersona() -->
    // .................................................................
    insertarPersona(datos) {
        let textoSQL =
            'insert into Persona values($dni, $nombre, $apellidos);'
        let valoresParaSQL = {
            $dni: datos.dni, $nombre: datos.nombre,
            $apellidos: datos.apellidos
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // buscarPersona() <--
    // <--
    // [{dni:Texto, nombre:Texto, apellidos:Texto}]
    // .................................................................
    buscarPersona() {
        let textoSQL = "select Persona.nombre,Persona.dni,Persona.apellidos from Persona WHERE dni NOT IN (SELECT dni FROM Profesor) ORDER BY dni";
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // datos:{codigo:N, nombre:Texto}
    // -->
    // insertarAsignatura() -->
    // .................................................................
    insertarAsignatura(datos) {
        let textoSQL =
            'insert into Asignatura values($codigo, $nombre, $creditos);'
        let valoresParaSQL = {
            $codigo: datos.codigo,
            $nombre: datos.nombre,
            $creditos: datos.creditos,
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // buscarAsignatura() <--
    // <--
    // [{coigo:N, nombre:Texto}]
    // .................................................................
    buscarAsignatura() {
        let textoSQL = "select * from Asignatura";
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // datos:{dni:Texto, codigo:N}
    // -->
    // insertarMatricula() -->
    // .................................................................
    insertarMatricula(datos) {
        let textoSQL =
            'insert into Matricula values($dni, $codigo, $nota, $curso);'
        let valoresParaSQL = {
            $dni: datos.dni,
            $codigo: datos.codigo,
            $nota: datos.nota,
            $curso: datos.curso
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
    buscarMedida() {
        let textoSQL = "select * from Medida ORDER BY id";
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()

    // .................................................................
    // buscarPersonasSinMatricula() <--
    // <--
    // [{dni:Texto, nombre:Texto, apellidos:Texto}]
    // .................................................................
    buscarPersonasSinMatricula() {
        let textoSQL = "select * from Persona where dni NOT IN (SELECT dni FROM Matricula) and dni NOT IN (SELECT dni FROM Profesor)";
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()

    // .................................................................
    // codigo:N
    // -->
    // buscarProfesorCodigo()
    // <--
    // [{nombre:Texto, apellidos:Texto}]
    // .................................................................
    buscarProfesorCodigo(codigo) {
        let textoSQL = "select * from Profesor, Imparte, Persona where Imparte.codigo=$codigo and Profesor.dni=Imparte.dni and Persona.dni=Profesor.dni";
        let valoresParaSQL = {$codigo: codigo}
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()

    // .................................................................
    // datos:{dni:Texto, codigo:N}
    // -->
    // insertarMatricula() -->
    // .................................................................
    insertarProfesor(datos) {
        let textoSQL =
            'insert into Profesor values($dni, $carga);'
        let valoresParaSQL = {
            $dni: datos.dni,
            $carga: datos.carga,
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // dni:Texto
    // -->
    // buscarMatriculaPorDNI() <--
    // <--
    // {codigo:N, nombre:Texto}
    // .................................................................
    buscarMatriculaPorDNI(dni) {
        let textoSQL = "select * from Matricula where dni=$dni";
        let valoresParaSQL = {$dni: dni}
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // codigo:N
    // -->
    // buscarMatriculaPorCodigo() <--
    // <--
    // {codigo:N, nombre:Texto}
    // .................................................................
    buscarMatriculaPorCodigo(codigo) {
        let textoSQL = "select * from Matricula where codigo=$codigo";
        let valoresParaSQL = {$codigo: codigo}
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // codigo:N
    // -->
    // buscarMatriculaPorCodigo() <--
    // <--
    // {codigo:N, nombre:Texto}
    // .................................................................
    buscarMatriculaPorCurso(data) {
        let textoSQL = "select * from Persona,Matricula where Matricula.codigo=$codigo and Matricula.curso=$curso and Persona.dni=Matricula.dni GROUP BY Persona.dni";
        let valoresParaSQL = {$codigo: data.codigo, $curso: data.curso}
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // dni:texto
    // -->
    // buscarMatriculaPorCodigo() <--
    // <--
    // {codigo:N, nombre:Texto, creditos}
    // .................................................................
    buscarImpartes(dni) {
        let textoSQL = "select * from Asignatura,Imparte where Imparte.dni=$dni and Imparte.codigo=Asignatura.codigo";
        let valoresParaSQL = {$dni: dni}
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // datos:{dni:Texto, codigo:N}
    // -->
    // insertarMatricula() -->
    // .................................................................
    insertarImparte(datos) {
        let textoSQL =
            'insert into Imparte values($dni, $codigo);'
        let valoresParaSQL = {
            $dni: datos.dni,
            $codigo: datos.codigo,
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // dni:Texto
    // -->
    // buscarMatriculaPorDNIyCodigo() <--
    // <--
    // {codigo:N, nombre:Texto}
    // .................................................................
    buscarAsignaturasPorDNI(dni) {
        let textoSQL = "select Asignatura.codigo, Asignatura.nombre, Matricula.nota, Matricula.curso from Persona,Asignatura,Matricula where Persona.dni=$dni and Matricula.dni=Persona.dni and Asignatura.codigo=Matricula.codigo";
        let valoresParaSQL = {$dni: dni}
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // codigo:n
    // -->
    // buscarPersonaPorCodigo() <--
    // <--
    // {dni:text, nombre:Texto, apellidos:text}
    // .................................................................
    buscarPersonaPorCodigo(codigo) {
        let textoSQL = "select Persona.dni, Persona.nombre, Persona.apellidos from Persona,Asignatura,Matricula where Asignatura.codigo=$codigo and Matricula.codigo=Asignatura.codigo and Persona.dni=Matricula.dni";
        let valoresParaSQL = {$codigo: codigo}
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // datos:{dni:Texto, nombre:Texto: apellidos:Texto}
    // -->
    // actualizarPersona() -->
    // .................................................................
    actualizarPersona(datos) {
        let textoSQL =
            'update Persona SET nombre=$nombre, apellidos=$apellidos where dni=$dni;'
        let valoresParaSQL = {
            $dni: datos.dni, $nombre: datos.nombre,
            $apellidos: datos.apellidos
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // datos:{dni:Texto, carga:N}
    // -->
    // actualizarProfesor() -->
    // .................................................................
    actualizarProfesor(datos) {
        let textoSQL =
            'update Profesor SET carga=$carga where dni=$dni;'
        let valoresParaSQL = {
            $dni: datos.dni, $carga: datos.carga
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // datos:{codigo:N, nombre:Texto}
    // -->
    // actualizarAsignatura() -->
    // .................................................................
    actualizarAsignatura(datos) {
        let textoSQL =
            'update Asignatura SET nombre=$nombre, creditos=$creditos where codigo=$codigo;'
        let valoresParaSQL = {
            $codigo: datos.codigo, $nombre: datos.nombre, $creditos: datos.creditos
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // datos:dni:Texto
    // -->
    // borrarPersona() -->
    // .................................................................
    borrarPersona(dni) {
        let textoSQL =
            'delete from Persona where dni=$dni;'
        let valoresParaSQL = {
            $dni: dni
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // datos:dni:Texto
    // -->
    // borrarProfesor() -->
    // .................................................................
    borrarProfesor(dni) {
        let textoSQL =
            'delete from Profesor where dni=$dni;'
        let valoresParaSQL = {
            $dni: dni
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // codigo:N
    // -->
    // borrarAsignatura() -->
    // .................................................................
    borrarAsignatura(codigo) {
        let textoSQL =
            'delete from Asignatura where codigo=$codigo;'
        let valoresParaSQL = {
            $codigo: codigo
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // dni:Texto
    // -->
    // borrarMatricula() -->
    // .................................................................
    borrarMatricula(data) {
        let textoSQL =
            'delete from Matricula where codigo=$codigo and curso=$curso and dni=$dni;'
        let valoresParaSQL = {
            $codigo: data.codigo, $curso: data.curso, $dni: data.dni
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // codigo:N
    // -->
    // borrarImparte() -->
    // .................................................................
    borrarImparte(codigo) {
        let textoSQL =
            'delete from Imparte where codigo=$codigo;'
        let valoresParaSQL = {
            $codigo: codigo
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
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
