var ractive = new Ractive({
  el: 'dynamic',
  template: '#template',
  data: { name: 'world' }
});

Kii.initializeWithSite("65d7aa9f", "783a838509d4699162e2181a8eb191c8", KiiSite.JP);

// do something with the kii api

ractive.set('name', 'world again')