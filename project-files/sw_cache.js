const cacheName = 'v2'

assets = [
    '/Stylesheets/XSL/certificate_type_3.xsl',
    '/XML/DCC-signed.xml',
    '/Stylesheets/CSS/certificate_type_3.css',
    '/Stylesheets/CSS/certificate_type_3.css.map',
    '/Stylesheets/JS/certificate-parser-min.js',
    '/Stylesheets/JS/main.js',
    '/Stylesheets/JS/sw_cache.js',
    '/Stylesheets/JS/validation.js',
    '/index.html',
    '/Stylesheets/images/uncertain.png',
    '/manifest.webmanifest',
    '/Stylesheets/images/scale192.png',
    '/Stylesheets/images/scale512.png',

]

self.addEventListener('install', e => {
    console.log('Service worker: installed');
    e.waitUntil(
        caches
          .open(cacheName)
          .then(cache => {
              console.log('service worker: caching files');
              cache.addAll(assets)
          })
          .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    console.log('Service worker: activated');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache != cacheName) {
                        console.log('Service Worker: Clearing old Cache');
                        return caches.delete(cache)
                    }
                })
            )
        })
    );
});

self.addEventListener('fetch', event => {
    console.log("Servicew Worker fetching");
    event.respondWith(
        fetch(event.request).catch(() => {
            //fetching from offline
            return caches.match(event.request)
        })
    );
});

