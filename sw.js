/* Saint-Brice FC – service worker (appli installable) */
var V='sbfc-v1';
var CORE=['/','/resultats','/actualites','/club','/inscriptions','/bandeira-cup','/maillot','/site.js','/calendriers.js','/fonts.css','/crest.webp','/icon-192.png','/photo-terrain.webp'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return Promise.all(CORE.map(function(u){return c.add(u).catch(function(){});}));}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V;}).map(function(x){return caches.delete(x);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;var u=new URL(r.url);if(u.origin!==location.origin)return;
  var fresh=r.mode==='navigate'||/\.(js|json|xml)$/.test(u.pathname);
  if(fresh){e.respondWith(fetch(r).then(function(res){if(res.ok){var cp=res.clone();caches.open(V).then(function(c){c.put(r,cp);});}return res;}).catch(function(){return caches.match(r,{ignoreSearch:true}).then(function(m){return m||caches.match('/');});}));}
  else{e.respondWith(caches.match(r).then(function(m){return m||fetch(r).then(function(res){if(res.ok){var cp=res.clone();caches.open(V).then(function(c){c.put(r,cp);});}return res;});}));}
});
