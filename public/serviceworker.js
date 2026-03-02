/*! For license information please see serviceworker.js.LICENSE.txt */

// OneSignal: must load first so push can be received (combined with existing SW per OneSignal docs)
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
// MoEngage service worker
importScripts("https://cdn.moengage.com/release/dc_3/serviceworker_cdn.min.latest.js");