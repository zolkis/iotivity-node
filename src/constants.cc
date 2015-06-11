#include <node.h>
#include <nan.h>

#include "enums.h"

extern "C" {
#include <ocstack.h>
}

using namespace v8;

// The rest of this file is generated

void InitConstants(Handle<Object> exports) {

  // ocstackconfig.h: Stack configuration
  SET_CONSTANT_MEMBER(exports, Number, DEV_ADDR_SIZE_MAX);
  SET_CONSTANT_MEMBER(exports, Number, MAX_CB_TIMEOUT_SECONDS);
  SET_CONSTANT_MEMBER(exports, Number, MAX_CONTAINED_RESOURCES);
  SET_CONSTANT_MEMBER(exports, Number, MAX_HEADER_OPTION_DATA_LENGTH);
  SET_CONSTANT_MEMBER(exports, Number, MAX_HEADER_OPTIONS);
  SET_CONSTANT_MEMBER(exports, Number, MAX_MANUFACTURER_NAME_LENGTH);
  SET_CONSTANT_MEMBER(exports, Number, MAX_MANUFACTURER_URL_LENGTH);
  SET_CONSTANT_MEMBER(exports, Number, MAX_QUERY_LENGTH);
  SET_CONSTANT_MEMBER(exports, Number, MAX_REQUEST_LENGTH);
  SET_CONSTANT_MEMBER(exports, Number, MAX_RESPONSE_LENGTH);
  SET_CONSTANT_MEMBER(exports, Number, MAX_URI_LENGTH);

  // octypes.h: Definitions
  SET_CONSTANT_MEMBER(exports, Number, OC_DEFAULT_PRESENCE_TTL_SECONDS);
  SET_CONSTANT_MEMBER(exports, Number, OC_MAX_PRESENCE_TTL_SECONDS);
  SET_CONSTANT_MEMBER(exports, Number, OC_MULTICAST_PORT);
  SET_CONSTANT_MEMBER(exports, String, OC_DATA_MODEL_VERSION);
  SET_CONSTANT_MEMBER(exports, String, OC_EXPLICIT_DEVICE_DISCOVERY_URI);
  SET_CONSTANT_MEMBER(exports, String, OC_MULTICAST_DISCOVERY_URI);
  SET_CONSTANT_MEMBER(exports, String, OC_MULTICAST_IP);
  SET_CONSTANT_MEMBER(exports, String, OC_MULTICAST_PREFIX);
  SET_CONSTANT_MEMBER(exports, String, OC_PRESENCE_URI);
  SET_CONSTANT_MEMBER(exports, String, OC_QUERY_SEPARATOR);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_BITMAP);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_CONTENT_TYPE);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_DATA_MODEL_VERSION);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_DEVICE_ID);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_DEVICE_NAME);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_FIRMWARE_VERSION);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_FW_VERSION);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_HARDWARE_VERSION);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_HOSTING_PORT);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_HOST_NAME);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_HREF);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_INTERFACE);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_INTERFACE_BATCH);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_INTERFACE_DEFAULT);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_INTERFACE_GROUP);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_INTERFACE_LL);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_MFG_DATE);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_MFG_NAME);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_MFG_URL);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_MODEL_NUM);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_NONCE);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_OC);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_OS_VERSION);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_PAYLOAD);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_PLATFORM_ID);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_PLATFORM_VERSION);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_POLICY);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_PROPERTY);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_REPRESENTATION);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_RESOURCE_TYPE);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_RESOURCE_TYPE_PRESENCE);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_SECURE);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_SERVER_INSTANCE_ID);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_SPEC_VERSION);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_SUPPORT_URL);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_SYSTEM_TIME);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_TRIGGER);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_TRIGGER_CHANGE);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_TRIGGER_CREATE);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_TRIGGER_DELETE);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_TTL);
  SET_CONSTANT_MEMBER(exports, String, OC_RSRVD_VERSION);
  SET_CONSTANT_MEMBER(exports, String, OC_SPEC_VERSION);
  SET_CONSTANT_MEMBER(exports, String, OC_WELL_KNOWN_QUERY);
}
