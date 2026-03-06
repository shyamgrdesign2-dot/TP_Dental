/*! For license information please see serviceworker.js.LICENSE.txt */

// OneSignal service worker
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
// MoEngage service worker
importScripts("https://cdn.moengage.com/release/dc_3/serviceworker_cdn.min.latest.js");

// PWA Service Worker for Tatva Practice Mobile
const CACHE_NAME = 'tatva-practice-mobile-v1';
const RUNTIME_CACHE = 'tatva-practice-runtime-v1';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/manifest.json',
];

// Install event - Cache assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        return self.skipWaiting(); // Activate immediately
      })
      .catch((error) => {
        console.error('[Service Worker] Cache failed:', error);
        // Continue installation even if caching fails
        return self.skipWaiting();
      })
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName).catch((err) => {
                // Silently fail if cache deletion fails
                console.warn('[Service Worker] Failed to delete cache:', cacheName, err);
              });
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim(); // Take control of all pages
      })
      .catch((error) => {
        // Continue activation even if cleanup fails
        console.warn('[Service Worker] Activation cleanup failed:', error);
        return self.clients.claim();
      })
  );
});

// Fetch event - Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // API requests - Network only (no caching)
  if (url.pathname.startsWith('/api/')) {
    return; // Let browser handle API requests normally
  }

  // Static assets - Cache first, network fallback
  if (
    url.pathname.startsWith('/static/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.woff') ||
    url.pathname.endsWith('.woff2')
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(request).then((response) => {
          // Don't cache if not a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          const responseToCache = response.clone();
          // Cache in background, don't block response
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseToCache).catch((err) => {
              // Silently fail cache operations - don't break the app
              console.warn('[Service Worker] Cache put failed:', err);
            });
            // Trim cache to max entries
            cache.keys().then((keys) => {
              if (keys.length > 100) {
                cache.delete(keys[0]);
              }
            }).catch(() => {});
          }).catch((err) => {
            // Silently fail if cache can't be opened
            console.warn('[Service Worker] Cache open failed:', err);
          });
          
          return response;
        }).catch((error) => {
          // Network error - return cached version if available
          console.warn('[Service Worker] Fetch failed:', error);
          return caches.match(request);
        });
      })
    );
    return;
  }

  // HTML pages - Network first, cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Only cache successful responses
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          // Cache in background, don't block response
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseToCache).catch((err) => {
              // Silently fail cache operations
              console.warn('[Service Worker] Cache put failed:', err);
            });
            // Trim cache to max entries
            cache.keys().then((keys) => {
              if (keys.length > 100) {
                cache.delete(keys[0]);
              }
            }).catch(() => {});
          }).catch((err) => {
            // Silently fail if cache can't be opened
            console.warn('[Service Worker] Cache open failed:', err);
          });
        }
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Fallback to index.html for SPA routing
          return caches.match('/').catch(() => {
            // If all else fails, return a basic response
            return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
          });
        });
      })
  );
});

// Message event - Handle messages from the app
self.addEventListener('message', (event) => {
  if (!event.data) {
    return;
  }

  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data.type === 'CACHE_URLS' && Array.isArray(event.data.urls)) {
    event.waitUntil(
      caches.open(RUNTIME_CACHE)
        .then((cache) => {
          return cache.addAll(event.data.urls);
        })
        .catch((error) => {
          // Silently fail cache operations
          console.warn('[Service Worker] Cache URLs failed:', error);
        })
    );
  }
});

console.log('[Service Worker] Loaded');
