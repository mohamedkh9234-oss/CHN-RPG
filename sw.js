const CACHE_NAME='chn-rpg-offline-v1';
const CORE_FILES=['./','./index.html','./manifest.webmanifest','./icon.svg'];
const THREE_URL='https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE_NAME);
    await cache.addAll(CORE_FILES);
    try{
      const response=await fetch(THREE_URL,{mode:'cors',cache:'reload'});
      if(response.ok) await cache.put(THREE_URL,response.clone());
    }catch(error){console.warn('Three.js could not be pre-cached; an online first launch is required.',error)}
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const names=await caches.keys();
    await Promise.all(names.filter(name=>name.startsWith('chn-rpg-')&&name!==CACHE_NAME).map(name=>caches.delete(name)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(request.mode==='navigate'&&url.origin===self.location.origin){
    event.respondWith((async()=>{
      try{const response=await fetch(request);const cache=await caches.open(CACHE_NAME);cache.put('./index.html',response.clone());return response}
      catch(error){return (await caches.match('./index.html'))||Response.error()}
    })());
    return;
  }
  if(request.url===THREE_URL){
    event.respondWith((async()=>{
      const cached=await caches.match(THREE_URL);if(cached)return cached;
      const response=await fetch(request);if(response.ok){const cache=await caches.open(CACHE_NAME);await cache.put(THREE_URL,response.clone())}return response;
    })());
    return;
  }
  if(url.origin===self.location.origin){
    event.respondWith((async()=>{
      const cached=await caches.match(request);if(cached)return cached;
      const response=await fetch(request);if(response.ok){const cache=await caches.open(CACHE_NAME);cache.put(request,response.clone())}return response;
    })());
  }
});
