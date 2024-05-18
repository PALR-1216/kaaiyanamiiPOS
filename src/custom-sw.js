importScripts('./ngsw-worker.js');

self.addEventListener('fetch', event => {
    if (event.request.url.includes('firestore.googleapis.com')) {
        // Use network first strategy for Firestore requests
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(event.request);
            })
        );
    }
});
