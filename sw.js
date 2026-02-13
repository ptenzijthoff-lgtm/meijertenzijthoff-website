// Service Worker voor degroenepaauw.nl
// Versienummer aanpassen bij updates aan de site
const CACHE_NAME = 'groene-paauw-v1';

// Pagina's en bestanden die je offline beschikbaar wilt hebben
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css'
  // Voeg hier meer pagina's en bestanden toe die je wilt cachen,
  // bijvoorbeeld: '/over-mij.html', '/columns.html', '/images/logo.png'
];

// Bij installatie: sla de belangrijkste bestanden op in de cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache geopend');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Bij activatie: ruim oude caches op
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

// Bij een netwerkrequest: probeer eerst het netwerk, val terug op cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Sla een kopie op in de cache voor volgende keer
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Geen netwerk? Probeer uit de cache te laden
        return caches.match(event.request);
      })
  );
});
