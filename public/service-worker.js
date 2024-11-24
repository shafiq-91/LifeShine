const CACHE_NAME = "app-cache-v1";
const OFFLINE_PAGE = "/offline.html";

// Pre-cache essential files, including the offline page
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        OFFLINE_PAGE, // Your custom offline page
      ]);
    })
  );
});

// Intercept network requests and serve from cache if offline
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.open(CACHE_NAME).then((cache) => {
          return cache.match(OFFLINE_PAGE);
        });
      })
    );
  }
});
