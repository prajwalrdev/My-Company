// Real-time visitor count listener
(function listenToVisitorCount() {
  if (!window.getDB) return;
  const db = window.getDB();
  if (!db) return;
  db.collection('analytics').doc('website_visits')
    .onSnapshot(function(doc) {
      if (doc.exists) {
        const count = doc.data().visitCount || 0;
        var el = document.getElementById('visitorCount');
        if (el) el.textContent = count;
      }
    });
})(); 