class Medida {


    constructor(fecha, valor, lat, lon) {
        this.fecha = fecha;
        this.valor = valor;
        this.lat = lat;
        this.lon = lon;
    }

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