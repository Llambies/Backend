/**
 *
 * logicaFake.js
 *
 * AUTOR: Adrian Maldonado Llambies
 * FECHA: 17/10/2021
 * DESCRIPCION: Clase logica del servidor
 *
 */


class logicaFake{
    static baseURL = "http://localhost:8080";

    constructor() {

    }

    /**
     * Devuelve las ultimas mediciones
     *
     * N : cuantas
     * =>
     * ObtenerUltimasMediciones()
     * <=
     * [ Medida ]
     *
     *
     * @param cuantas
     * @param cb
     * @returns [ Medida ]
     */
    static obtenerUltimasMediciones(cuantas,cb){

        let datos = [];
        let url = this.baseURL + "/medida/cuantas/" + cuantas;


        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(function (err) {
                console.log('Fetch /medida/cauntas/ fallido ' + err);
            })
            .then(function (res) {
                    res.forEach(function (item) {
                        datos.push(new Medida(item.fecha,item.valor,item.lat,item.lon));
                    })
                    cb(datos)
                }
            )

    }

    /**
     *
     * ObtenerTodasLasMediciones()
     * <=                      <=
     * [ Medida ]
     *
     *
     * @returns [ Medida ]
     */
    static obtenerTodasLasMediciones(cb){
        let datos = [];
        let url = this.baseURL + "/medida";

        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(function (err) {
                console.log('Fetch /medida fallido ' + err);
            })
            .then(function (res) {
                    res.forEach(function (item) {
                        datos.push(new Medida(item.fecha,item.valor,item.lat,item.lon));
                    })
                cb(datos)
                }
            )
    }

    /**
     *
     * medida : Medida
     * <=
     * InsertarMedicion()
     *                 =>
     *
     * @param medida
     */

    static insertarMedida(medida){

        let datos = JSON.stringify(medida)
        let url = this.baseURL + "/persona/" + datos;
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .catch((err) => console.log('Fetch failed ' + err))
            .then(function (res) {
                if (res.status === 404) {
                    console.log('No se pudo insertar');
                } else {
                    console.log('Insertado');

                }

            })
    }


}