// ........................................................
// mainTest1.js
// ........................................................
var request = require ('request')
var assert = require ('assert')
// ........................................................
// ........................................................
const IP_PUERTO="http://localhost:8080"
// ........................................................
// main ()
// ........................................................
describe( "Test 1 : Gestion de Medidas", function() {
	// ....................................................

	// ....................................................
	it( "probar que GET /medida funciona", function( hecho ) {
		request.get(
			{ url : IP_PUERTO+"/medida", headers : { 'User-Agent' : 'adrian' }},
			function( err, respuesta, carga ) {
				assert.equal( err, null, "¿Ha habido un error?" )
				assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
				assert.equal( carga, '[{"dni":"1234A","nombre":"Pepe","apellidos":"Pérez Pérez"}]', "¿La carga no es Pepito?" )
				hecho()
			} // callback()
		) // .get
	}) // it
	// ....................................................

	// ....................................................
	it( "probar POST /medida", function( hecho ) {
    let objdatosPersona =
    { fecha : "ayer", valor : 34, lat : "23ºN", lon : "34ºS"}
    let datosPersona=JSON.stringify( objdatosPersona )
		request.post(
      { url : IP_PUERTO+"/medida/"+datosPersona,
				headers : { 'User-Agent' : 'adrian', 'Content-Type' : 'application/json' }
			},
			function( err, respuesta, carga ) {
        assert.equal( err, null, "¿Ha habido un error?" )
				assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
        hecho()
			} // callback
		) // .post
	}) // it
	// ..................................................
  // ....................................................
}) // describe
