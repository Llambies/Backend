/**
 *
 * Medida.js
 *
 * AUTOR: Adrian Maldonado Llambies
 * FECHA: 17/10/2021
 * DESCRIPCION: Clase medida
 *
 */

class Medida {

    /**
     *
     * Constructor
     *
     * @param fecha
     * @param valor
     * @param lat
     * @param lon
     */
    constructor(fecha, valor, lat, lon) {
        this.fecha = fecha;
        this.valor = valor;
        this.lat = lat;
        this.lon = lon;
    }

    /**
     *
     * Devuelve el estado
     *
     * @returns {string}
     */
    estado() {
        if (this.valor < 75) {
            return "bueno";
        } else if (this.valor < 100) {
            return "regular";
        } else if (this.valor < 150) {
            return "malo";
        } else {
            return "muy malo";
        }
    }

}