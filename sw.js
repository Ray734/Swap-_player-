const C='swap-player-v2.5.1',A=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(A)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET'||new URL(r.url).origin!=location.origin)return;e.respondWith(fetch(r).then(x=>{if(x.ok){const k=x.clone();e.waitUntil(caches.open(C).then(c=>c.put(r,k)))}return x}).catch(()=>caches.match(r,{ignoreSearch:true})))});
