const { createProxyMiddleware } = require("http-proxy-middleware");

/**
 * - Digitization API → localhost:3021
 * - Neo BLE (ws_server.py) → localhost:8081 (WebSocket + /recordings)
 */
const normalizeLoopback = (url, fallback) =>
  (url || fallback).replace("://localhost", "://127.0.0.1");

const NEO_GATEWAY = normalizeLoopback(
  process.env.REACT_APP_NEO_LOCAL_GATEWAY,
  "http://127.0.0.1:3021"
);
const NEO_BLE_SERVER = normalizeLoopback(
  process.env.REACT_APP_NEO_DEVICE_PROXY,
  "http://127.0.0.1:8081"
);

const wsTarget = (httpUrl) => httpUrl.replace(/^http/, "ws");

module.exports = function setupProxy(app) {
  if (process.env.NODE_ENV === "development") {
    const ipdOrigin =
      process.env.REACT_APP_IPD_API_ORIGIN || "https://pm-ipd-uat.tatvacare.in";
    app.use(
      "/ipd-api",
      createProxyMiddleware({
        target: ipdOrigin,
        changeOrigin: true,
        pathRewrite: { "^/ipd-api": "/api/v1" },
        logLevel: "warn",
      })
    );
  }

  if (process.env.REACT_APP_NEO_USE_LOCAL_PROXY !== "true") {
    return;
  }

  app.use(
    "/api/v1/digitization",
    createProxyMiddleware({
      target: NEO_GATEWAY,
      changeOrigin: true,
      logLevel: "warn",
    })
  );

  // WebSocket MUST go to ws_server.py on :8081 (NOT :3021)
  app.use(
    "/neo-ws",
    createProxyMiddleware({
      target: wsTarget(NEO_BLE_SERVER),
      changeOrigin: true,
      ws: true,
      pathRewrite: { "^/neo-ws": "/ws" },
      logLevel: "debug",
    })
  );

  // Recordings WAV files live on ws_server :8081
  app.use(
    "/recordings",
    createProxyMiddleware({
      target: NEO_BLE_SERVER,
      changeOrigin: true,
      logLevel: "warn",
    })
  );

  app.use(
    "/neo-device",
    createProxyMiddleware({
      target: NEO_BLE_SERVER,
      changeOrigin: true,
      pathRewrite: { "^/neo-device": "" },
      logLevel: "warn",
    })
  );

  app.use(
    "/neo-health",
    createProxyMiddleware({
      target: NEO_BLE_SERVER,
      changeOrigin: true,
      pathRewrite: { "^/neo-health": "/health" },
      logLevel: "warn",
    })
  );

  // Neo Sapien voice API (Tatva Pendant consultations list + digitize)
  app.use(
    "/neo-sapien",
    createProxyMiddleware({
      target: NEO_GATEWAY,
      changeOrigin: true,
      pathRewrite: { "^/neo-sapien": "" },
      logLevel: "warn",
    })
  );
};
