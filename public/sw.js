// Bump this whenever the cached shell changes; the activate handler below
// deletes every cache that does not match, which is what retires the old one.
const CACHE_NAME = 'paradise252-v3';

const PRECACHE_ASSETS = [
  '/',
  '/manifest.json',
  '/sun.svg',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/about',
  '/guide',
  '/activities',
  '/food',
  '/groceries',
  '/info',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      // A single failed asset would reject the whole addAll, so cache them
      // individually and tolerate misses.
      .then((cache) =>
        Promise.all(
          PRECACHE_ASSETS.map((asset) =>
            cache.add(asset).catch(() => undefined)
          )
        )
      )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Pages are network-first so guests see content updates on their next
  // visit, with the cached copy as the offline fallback. Previously every
  // response was served cache-first, which pinned installed devices to
  // whatever HTML they happened to fetch first.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match('/'))
            .then(
              (cached) =>
                cached ||
                new Response('You are offline.', {
                  status: 503,
                  headers: { 'Content-Type': 'text/plain' },
                })
            )
        )
    );
    return;
  }

  // Static assets are content-hashed, so cache-first is safe and fast.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
