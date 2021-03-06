var iotivity = require( "bindings" )( "iotivity" ),
	OicResource = require( "./OicResource" ),
	utils = require( "./utils" ),
	_ = require( "lodash" ),
	OicServer = function( device ) {
		if ( !this._isOicServer ) {
			return new OicServer( device );
		}
		this._device = device;
	},
	OicRequestEvent = function() {
		if ( !this._isOicRequestEvent ) {
			return new OicRequestEvent();
		}
	};

_.extend( OicRequestEvent.prototype, {
	_isOicRequestEvent: true,

	_constructResponse: function( entityHandlerResult, payloadObject ) {
		return new Promise( _.bind( function( fulfill, reject ) {
			var result, i,
				headerOptions = [];

			for ( i = 0; i < this.headerOptions.length; i++ ) {
				headerOptions[ i ] = {
					name: this.headerOptions[ i ].name,
					value: this.headerOptions[ i ].value
				};
			}

			result = iotivity.OCDoResponse( {
				requestHandle: this.requestId,
				resourceHandle: this._resourceHandle,
				payload: ( payloadObject ? utils.objectToPayload( payloadObject ) : null ),
				sendVendorSpecificHeaderOptions: headerOptions,
				resourceUri: ( iotivity.OCGetResourceUri( this._resourceHandle ) || "" ),
				ehResult: entityHandlerResult
			} );
			if ( result !== iotivity.OCStackResult.OC_STACK_OK ) {
				reject( _.extend( new Error( "OCDoResponse Error" ), {
					result: result
				} ) );
			} else {
				fulfill();
			}
		}, this ) );
	},

	sendResponse: function( resource ) {
		return this._constructResponse( iotivity.OCEntityHandlerResult.OC_EH_OK,
			resource ? resource.properties : null );
	},

	sendError: function( error ) {
		return this._constructResponse( iotivity.OCEntityHandlerResult.OC_EH_ERROR,
			( typeof error === "string" ? { message: error } : error ) );
	}
} );

require( "util" ).inherits( OicServer, require( "events" ).EventEmitter );

_.extend( OicServer.prototype, {
	_isOicServer: true,
	onrequest: null,
	_resources: [],
	_interestedObservers: [],

	// Called by OicDevice once OCInit() has succeeded
	_init: function() {
		var result = iotivity.OCSetDefaultDeviceEntityHandler( this._createEntityHandler() );

		if ( result !== iotivity.OCStackResult.OC_STACK_OK ) {
			return _.extend( new Error( "server init: OCSetDefaultDeviceEntityHandler() failed" ),
				{ result: result } );
		}
	},

	_createEntityHandler: function( resource ) {
		return _.bind( function( flag, request /*, url*/ ) {

			// Handle the request and raise events accordingly
			var i, id,
				url = iotivity.OCGetResourceUri( request.resource ),
				oicReq = new OicRequestEvent();

			oicReq._resourceHandle = request.resource;
			oicReq.requestId = request.requestHandle;
			for ( id in this._resources ) {
				if ( this._resources[ id ].url === url ) {
					oicReq.target = id;
				}
			}
			if ( resource ) {
				oicReq.source = resource;
			}

			if ( flag & iotivity.OCEntityHandlerFlag.OC_REQUEST_FLAG ) {

				// As per the C++ Code: The query format is q1=v1&;q1=v2;
				var seperator = "&;";
				var qparams = request.query.split( seperator );
				oicReq.queryOptions = new Array( qparams.length );

				for ( i = 0; request.query !== "" && i < qparams.length; i++ ) {
					var param = qparams[ i ].split( "=" );
					oicReq.queryOptions[ i ] = [];
					oicReq.queryOptions[ i ].key = param[ 0 ];
					oicReq.queryOptions[ i ].value = param[ 1 ];
				}

				var len = request.rcvdVendorSpecificHeaderOptions.length;
				oicReq.headerOptions = new Array( len );
				if ( len > 0 ) {
					for ( i = 0; i < len; i++ ) {
						var headerOption = {};

						headerOption.name =
							request.rcvdVendorSpecificHeaderOptions[ i ].optionID;
						headerOption.value =
							request.rcvdVendorSpecificHeaderOptions[ i ].optionData;
						oicReq.headerOptions[ i ] = headerOption;
					}
				}

				if ( request.method === iotivity.OCMethod.OC_REST_GET ) {
					oicReq.type = "retrieve";
				} else if ( request.method === iotivity.OCMethod.OC_REST_POST ) {
					oicReq.type = "create";

					oicReq.res = {
						url: request.payload.uri,
						interfaces: request.payload.interfaces,
						resourceTypes: request.payload.types,
						properties: utils.payloadToObject( request.payload.values ),

						// FIXME: The client should be able to specify this
						discoverable: true
					};

				} else if ( request.method === iotivity.OCMethod.OC_REST_PUT ) {
					if ( resource ) {
						oicReq.type = "update";

						// FIXME: Check if this is the right way of doing it.
						oicReq.res = utils.payloadToObject( request.payload.values );
					}
				} else if ( request.method === iotivity.OCMethod.OC_REST_DELETE ) {
					oicReq.type = "delete";
				} else if ( request.method === iotivity.OCMethod.OC_REST_OBSERVE ) {
					oicReq.type = "observe";
				}

			}

			if ( flag & iotivity.OCEntityHandlerFlag.OC_OBSERVE_FLAG ) {
				if ( request.obsInfo.action ===
						iotivity.OCObserveAction.OC_OBSERVE_REGISTER ) {
					this._interestedObservers.push( request.obsInfo.obsId );
				} else if ( request.obsInfo.action ===
						iotivity.OCObserveAction.OC_OBSERVE_DEREGISTER ) {
					var index = this._interestedObservers
						.indexOf( request.obsInfo.obsId );

					// FIXME: Should we loop and remove?
					while ( index !== -1 ) {
						this._interestedObservers.splice( index, 1 );
						index = this._interestedObservers
							.indexOf( request.obsInfo.obsId );
					}
				}

				// FIXME: Check how this should be done.
				oicReq.type = "observe";
			}

			this.dispatchEvent( "request", oicReq );

			return iotivity.OCEntityHandlerResult.OC_EH_OK;
		}, this );
	},

	addEventListener: OicServer.prototype.addListener,

	removeEventListener: OicServer.prototype.removeListener,

	dispatchEvent: function( event, request ) {
		this.emit( event, request );
		if ( typeof this[ "on" + event ] === "function" ) {
			this[ "on" + event ]( request );
		}
	},

	registerResource: function( init ) {
		return new Promise( _.bind( function( fulfill, reject ) {
			var result = 0;
			var flag = 0;
			var handleReceptacle = {};
			var resource = new OicResource( init );

			if ( init.discoverable ) {
				flag |= iotivity.OCResourceProperty.OC_DISCOVERABLE;
			}

			if ( init.observable ) {
				flag |= iotivity.OCResourceProperty.OC_OBSERVABLE;
			}

			result = iotivity.OCCreateResource(
				handleReceptacle,

				// FIXME: API SPEC mentions an array.Vaguely remember that the first type is
				// default from the Oic Spec. Check it up.
				init.resourceTypes[ 0 ],

				// FIXME: API SPEC mentions an array.Vaguely remember that the first type is
				// default from the Oic Spec. Check it up.
				init.interfaces[ 0 ],
				init.url,
				this._createEntityHandler( resource ),
				flag );

			if ( result !== iotivity.OCStackResult.OC_STACK_OK ) {
				reject( _.extend( new Error( "registerResource: OCCreateResource() failed" ), {
					result: result
				} ) );
				return;
			}

			resource._handle = handleReceptacle.handle;
			this._resources[ resource.id ] = resource;
			fulfill( resource );
		}, this ) );

	},

	unregisterResource: function( resourceId ) {
		return new Promise( _.bind( function( fulfill, reject ) {
			var result;

			result = iotivity.OCDeleteResource( this._resources[ resourceId ]._handle );
			if ( result !== iotivity.OCStackResult.OC_STACK_OK ) {
				reject( _.extend( new Error( "unregisterResource: OCDeleteResource() failed" ), {
					result: result
				} ) );
				return;
			}

			delete this._resources[ resourceId ]
			;

			fulfill();
		}, this ) );
	},

	enablePresence: function( ttl ) {
		return new Promise( _.bind( function( fulfill, reject ) {
			var result;

			result = iotivity.OCStartPresence( ttl ? ttl : 0 );

			if ( result !== iotivity.OCStackResult.OC_STACK_OK ) {
				reject( _.extend( new Error( "enablePresence: OCStartPresence() failed" ), {
					result: result
				} ) );
				return;
			}

			fulfill();
		}, this ) );
	},

	disablePresence: function() {
		return new Promise( _.bind( function( fulfill, reject ) {
			var result;

			result = iotivity.OCStopPresence();

			if ( result !== iotivity.OCStackResult.OC_STACK_OK ) {
				reject( _.extend( new Error( "enablePresence: OCStopPresence() failed" ), {
					result: result
				} ) );
				return;
			}

			fulfill();
		}, this ) );
	},

	notify: function( resourceId ) {
		return new Promise( _.bind( function( fulfill, reject ) {
			var result, resource;

			if ( this._interestedObservers.length > 0 ) {
				resource = this._resources[ resourceId ];

				result = iotivity.OCNotifyListOfObservers( resource._handle,
					this._interestedObservers,
					_.extend( utils.objectToPayload( resource.properties ), {
						uri: resource.url
					} ),
					iotivity.OCQualityOfService[
						( this._device.settings.connectionMode === "acked" ?
							"OC_HIGH_QOS" : "OC_LOW_QOS" )
						]
				);

				if ( result !== iotivity.OCStackResult.OC_STACK_OK ) {
					reject( _.extend( new Error( "notify: OCNotifyListOfObservers() failed" ), {
						result: result
					} ) );
					return;
				}
			} else {
				reject( _.extend( new Error( "notify: There are no observers" ),
					{ noObservers: true } ) );
			}

			fulfill();
		}, this ) );
	}
} );

module.exports = OicServer;
