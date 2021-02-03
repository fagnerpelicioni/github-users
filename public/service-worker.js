/* eslint-disable no-undef */
const prefix = 'github-users';
const suffix = 'v1';

workbox.setConfig({
  debug: false,
});

workbox.core.setCacheNameDetails({
  prefix,
  suffix,
});

// workbox.precaching.precacheAndRoute([
//   '/offline.html'
// ]);

workbox.googleAnalytics.initialize();

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: `${prefix}-images-${suffix}`,
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  /\.(?:woff|woff2)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: `${prefix}-fonts-${suffix}`,
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 5,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: `${prefix}-assets-${suffix}`,
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  /\/.+\//,
  new workbox.strategies.NetworkOnly({
    cacheName: `${prefix}-htmlcache-${suffix}`,
  }),
);

// workbox.routing.setCatchHandler(({ event }) => {
//   switch (event.request.destination) {
//     case 'document':
//       return caches.match('offline.html');
//       break;
//     default:
//       return Response.error();
//   }
// });
