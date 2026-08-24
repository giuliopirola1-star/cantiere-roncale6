// Cambia questo nome ogni volta che aggiorni la lista documenti,
// così il telefono scarica di nuovo i file aggiornati.
const CACHE_NAME = 'cantiere-docs-v1';

// Deve corrispondere esattamente all'elenco DOCUMENTI in index.html
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './documenti/PSC.pdf',
  './documenti/POS.pdf',
  './documenti/DUVRI.pdf',
  './documenti/Planimetria.pdf',
  './documenti/Nomine.pdf',
  './documenti/Formazione.pdf'
];

// Installazione: scarica e salva tutto in cache
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Attivazione: elimina le cache vecchie
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Ogni richiesta: rispondi dalla cache se disponibile, altrimenti prova la rete
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        // salva anche eventuali nuovi file richiesti, per usi futuri offline
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      }).catch(() => cached);
    })
  );
});
