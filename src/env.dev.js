const DEV = {
  name: "dev",
  baseUrl: "https://proxy.dev2.clane.com/?url=https://claneapp.dev.clane.com/api/",
  qrURl: "http://merchant.dev2.clane.com:9003/",
  keys: {
    deviceId: "@DEVICE_ID",
    authId: "@AUTH_ID",
    accessId: "@AUTH_ACCESS_ID",
    refreshId: "@AUTH_REFRESH_ID",
  },
  page: {
    limit: 50,
    current: 1,
  },
  demo: true,
  version: "1.0.0",
};

export default DEV;
