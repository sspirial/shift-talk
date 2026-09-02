const VERSION = "v6";
const CACHE_NAME = `shift-talk-${VERSION}`;
const APP_SHELL = [
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./js/store.js",
  "./js/migrate.js",
  "./js/validate.js",
  "./js/schedule.js",
  "./js/generate.js",
  "./js/firebase.js",
  "./js/firebase-config.js",
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js",
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js",
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js",
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-ai.js",
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-remote-config.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// App modules use stale-while-revalidate so updates arrive on a later visit.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(cached => {
    const update = fetch(event.request).then(response => {
      if (response && response.status === 200) {
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
      }
      return response;
    }).catch(() => cached);
    return cached || update;
  }));
});