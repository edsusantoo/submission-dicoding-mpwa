var dbPromised = idb.open("ednews", 1, function(upgradeDb) {
    var clubObjectStore = upgradeDb.createObjectStore("club", {
      keyPath: "id"
    });
    clubObjectStore.createIndex("name", "name", { unique: false });
  });

  function saveForLater(club) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("club", "readwrite");
        var store = tx.objectStore("club");
        store.put(club);
        return tx.complete;
      })
      .then(function() {
        console.log("Club berhasil di simpan.");
        
        M.toast({html: 'Club berhasil di simpan'});
      });
  }

  function getAllClub() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("club", "readonly");
          var store = tx.objectStore("club");
          return store.getAll();
        })
        .then(function(club) {
          resolve(club);
        });
    });
  }

  function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("club", "readonly");
          var store = tx.objectStore("club");
          return store.get(id);
        })
        .then(function(club) {
          resolve(club);
        });
    });
  }

  function deleteById(id){
    
    dbPromised.then(function(db) {
      var tx = db.transaction('club', 'readwrite');
      var store = tx.objectStore('club');
      store.delete(id);
      return tx.complete;
    }).then(function() {
      console.log('Item deleted');
      M.toast({html: 'Club berhasil di hapus'});
    });
  }