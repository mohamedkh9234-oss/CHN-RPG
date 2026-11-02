Community Health Nursing RPG — Offline + GA4 package

Files to upload together to the SAME GitHub Pages folder:
- index.html
- sw.js
- manifest.webmanifest
- icon.svg

Offline behavior:
- The first successful launch must be online so the browser can download the page and the pinned Three.js module.
- After the service worker finishes installing, reload once while online. The page and Three.js module are cached for offline use.
- Saved game progress stays in the browser's localStorage on that device. Browser/site-data clearing can remove it; use the in-game progress export before changing devices or clearing data.

Google Analytics 4:
- Configured for this game only with Measurement ID G-XV404W2HM9.
- Analytics events are queued locally while offline and sent when the browser is online and the GA tag loads.
- Analytics cannot report new visits while the device is offline; queued events are sent after reconnection.

No background music was added. Existing character speech uses the device's built-in Speech Synthesis where available.
