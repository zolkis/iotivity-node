// The native code
var iotivity = require( "bindings" )( "iotivity" );

// Enums
iotivity.OC_SOCKET_OPTION = {
	OC_SOCKET_NOOPTION: 0,
	OC_SOCKET_REUSEADDR: 1
};

iotivity.OCEntityHandlerFlag = {
	OC_INIT_FLAG: 0,
	OC_REQUEST_FLAG: 1,
	OC_OBSERVE_FLAG: 2
};

iotivity.OCEntityHandlerResult = {
	OC_EH_OK: 0,
	OC_EH_ERROR: 1,
	OC_EH_RESOURCE_CREATED: 2,
	OC_EH_RESOURCE_DELETED: 3,
	OC_EH_SLOW: 4,
	OC_EH_FORBIDDEN: 5
};

iotivity.OCMethod = {
	OC_REST_NOMETHOD: 0,
	OC_REST_GET: 1,
	OC_REST_PUT: 2,
	OC_REST_POST: 3,
	OC_REST_DELETE: 4,
	OC_REST_OBSERVE: 5,
	OC_REST_OBSERVE_ALL: 6,
	OC_REST_CANCEL_OBSERVE: 7
};

iotivity.OCMode = {
	OC_CLIENT: 0,
	OC_SERVER: 1,
	OC_CLIENT_SERVER: 2
};

iotivity.OCObserveAction = {
	OC_OBSERVE_REGISTER: 0,
	OC_OBSERVE_DEREGISTER: 1,
	OC_OBSERVE_NO_OPTION: 2
};

iotivity.OCQualityOfService = {
	OC_LOW_QOS: 0,
	OC_MEDIUM_QOS: 1,
	OC_HIGH_QOS: 2,
	OC_NA_QOS: 3
};

iotivity.OCResourceProperty = {
	OC_ACTIVE: 0,
	OC_DISCOVERABLE: 1,
	OC_OBSERVABLE: 2,
	OC_SLOW: 3,
	OC_SECURE: 4
};

iotivity.OCStackApplicationResult = {
	OC_STACK_DELETE_TRANSACTION: 0,
	OC_STACK_KEEP_TRANSACTION: 1
};

iotivity.OCStackResult = {
	OC_STACK_OK: 0,
	OC_STACK_RESOURCE_CREATED: 1,
	OC_STACK_RESOURCE_DELETED: 2,
	OC_STACK_CONTINUE: 3,
	OC_STACK_INVALID_URI: 4,
	OC_STACK_INVALID_QUERY: 5,
	OC_STACK_INVALID_IP: 6,
	OC_STACK_INVALID_PORT: 7,
	OC_STACK_INVALID_CALLBACK: 8,
	OC_STACK_INVALID_METHOD: 9,
	OC_STACK_INVALID_PARAM: 10,
	OC_STACK_INVALID_OBSERVE_PARAM: 11,
	OC_STACK_NO_MEMORY: 12,
	OC_STACK_COMM_ERROR: 13,
	OC_STACK_NOTIMPL: 14,
	OC_STACK_NO_RESOURCE: 15,
	OC_STACK_RESOURCE_ERROR: 16,
	OC_STACK_SLOW_RESOURCE: 17,
	OC_STACK_DUPLICATE_REQUEST: 18,
	OC_STACK_NO_OBSERVERS: 19,
	OC_STACK_OBSERVER_NOT_FOUND: 20,
	OC_STACK_VIRTUAL_DO_NOT_HANDLE: 21,
	OC_STACK_INVALID_OPTION: 22,
	OC_STACK_MALFORMED_RESPONSE: 23,
	OC_STACK_PERSISTENT_BUFFER_REQUIRED: 24,
	OC_STACK_INVALID_REQUEST_HANDLE: 25,
	OC_STACK_INVALID_DEVICE_INFO: 26,
	OC_STACK_INVALID_JSON: 27,
	OC_STACK_PRESENCE_STOPPED: 28,
	OC_STACK_PRESENCE_TIMEOUT: 29,
	OC_STACK_PRESENCE_DO_NOT_HANDLE: 30,
	OC_STACK_ERROR: 31
};

iotivity.OCTransportProtocolID = {
	OC_INVALID_ID: 0,
	OC_COAP_ID: 1
};

iotivity.OCVirtualResources = {
	OC_WELL_KNOWN_URI: 0,
	OC_DEVICE_URI: 1,
	OC_RESOURCE_TYPES_URI: 2,
	OC_PRESENCE: 3,
	OC_MAX_VIRTUAL_RESOURCES: 4
};

module.exports = iotivity;