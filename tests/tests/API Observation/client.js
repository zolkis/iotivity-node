var resourceFound = false,
	observationCount = 0,
	uuid = process.argv[ 2 ],
	utils = require( "../../assert-to-console" ),
	device = require( "../../../index" )();

console.log( JSON.stringify( { assertionCount: 3 } ) );

function discoverResources() {
	device.client.addEventListener( "resourcefound", function( event ) {
		if ( !resourceFound && event.resource.uri === "/a/" + uuid ) {
			resourceFound = true;
			device.client.addEventListener( "resourcechange", function( event ) {
				if ( ++observationCount >= 10 ) {
					device.client.cancelObserving( event.resource.id ).catch(
						function( error ) {
							utils.die( "Client: cancelObserving() failed with " +
								error + " and result " + error.result );
						}
					);
				}
			} );
			device.client.startObserving( event.resource.id ).then(
				function( observedResource ) {
					utils.assert( "strictEqual", observedResource.id, event.resource.id,
						"Client: resource returned by startObserving() has the same ID as the " +
						"resource for whose ID observation was requested" );
				},
				function( error ) {
					utils.die( "Client: startObserving() failed with " + error + " and result " +
						error.result );
				} );
		}
	} );
	device.client.findResources().then(
		function() {
			utils.assert( "ok", true, "Client: findResources() successful" );
		},
		function( error ) {
			utils.die( "Client: findResources() failed with " + error +
				" and result " + error.result );
		} );
}

device.configure( {
	role: "client",
	connectionMode: "acked"
} ).then(
	function() {
		utils.assert( "ok", true, "Client: device.configure() successful" );

		discoverResources();
	},
	function( error ) {
		utils.assert( "ok", false, "Client: device.configure() failed with " + error );
	} );

