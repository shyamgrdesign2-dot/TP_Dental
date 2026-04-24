// cleanup service worker

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Delete all caches
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));

    // Unregister itself
    await self.registration.unregister();

    // Refresh all open tabs
    const clients = await self.clients.matchAll({ type: 'window' });
    for (const client of clients) {
      client.navigate(client.url);
    }
  })());
});