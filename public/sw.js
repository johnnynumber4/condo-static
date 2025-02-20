const CACHE_NAME = 'paradise252-v1';

// Add whichever assets you want to pre-cache here
const PRECACHE_ASSETS = [
  '/',
  '/manifest.json',
  '/sun.svg',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/about',
  '/guide',
  '/activities',
  '/info',
  '/guestbook',
  '/groceries'
];

// Install event - precache all essential resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting(); // Ensure new service worker takes over immediately
});

// Fetch event - serve from cache first, then network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if found
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise fetch from network
      return fetch(event.request)
        .then((response) => {
          // Don't cache if not a success response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Cache the network response for future
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            if (event.request.method === 'GET') {
              cache.put(event.request, responseToCache);
            }
          });

          return response;
        })
        .catch(() => {
          // Return a fallback page if offline and page not in cache
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
        });
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
}); 