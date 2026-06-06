const CACHE_NAME = 'oxford-mastery-v2';
const ASSETS = [
    '/voc/',
    '/voc/index.html',
    '/voc/css/main.css',
    '/voc/js/app.js',
    '/voc/data/oxford3000.json',
    '/voc/manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
