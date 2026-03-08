// coi-serviceworker.js
// Injects Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy headers
// so that SharedArrayBuffer (required by AtomVM WASM) works on GitHub Pages.

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // Only process same-origin requests
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    fetch(e.request).then((response) => {
      // Skip opaque responses
      if (response.type === "opaque") return response;

      const headers = new Headers(response.headers);
      headers.set("Cross-Origin-Opener-Policy", "same-origin");
      headers.set("Cross-Origin-Embedder-Policy", "require-corp");
      headers.set("Cross-Origin-Resource-Policy", "cross-origin");

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    })
  );
});
