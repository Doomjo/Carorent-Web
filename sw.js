const cacheName = 'cache-v1';
const precacheResources = [
  "/",
  "assets/css/style.css",
  "assets/js/index.js", 
  "assets/js/main.js", 
  "assets/css/login-style.css",
  "assets/css/payment.css",
  "assets/css/profileUI.css",
  "assets/img/icon-192x192.png",
  "js2/filterscript.js",
  "js2/notification.js",
  "js2/payment.js",
  "js2/storage.js",
  "car-list.html",
  "profile.html",
  "vaccine.html",
  "faq.html",
  "aboutUs.html",
  "contactUs.html",
  "index.html",
  "audi.html",
  "bmw.html",
  "honda.html",
  "mercedes.html",
  "nissan.html",
  "proton.html",
  "toyota.html"
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
    );
});
    
self.addEventListener('activate', event => {
    console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        if (cachedResponse) {
            return cachedResponse;
        }
        return fetch(event.request);
        })
    );
});