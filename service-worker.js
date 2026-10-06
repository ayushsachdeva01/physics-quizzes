const CACHE='physora-v3-formula-modes';
const ASSETS=['./','./index.html','./style.css?v=31','./ccf-renderer.js?v=3','./script.js?v=31','./fonts/Englebert-Regular.ttf','./packs/packs_config.json','./data/physics_formulas.json','./assets/physora-logo.png','./assets/physora-192.png','./assets/physora-180.png','./assets/monocode-logo.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res;}).catch(()=>caches.match('./index.html'))));
});
