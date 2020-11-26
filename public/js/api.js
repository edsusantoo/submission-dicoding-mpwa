const base_url = "https://api.football-data.org/v2/";
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getCompititionsUCL() {
    if ('caches' in window) {
        caches.match(base_url + "competitions/2001/standings").then(function(response) {
          if (response) {
          
            response.json().then(function (data) {
              var clubHTML = "";
              data.standings.forEach(function(standing) {
                  clubHTML += `
                      <tr>
                        <td colspan="10" style="text-align: left; padding-left: 15px; font-weight: bold; background-color: teal;color: white;">${standing.group.replace("_", " ")}</td>
                      </tr>
                    `;
                    standing.table.forEach(function(club){
                      clubHTML += `
                        <tr>
                        <td>${club.position}</td>
                        <td >
                        <a href="/pages/detail-team.html?id=${club.team.id}" class="td-logo-name-club">
                          <img
                            src="${club.team.crestUrl}"
                            class="logo-team"
                          />
                          <p class="td-team-name">${club.team.name}</p>
                          </a>
                        </td>
                        <td>${club.playedGames}</td>
                        <td>${club.won}</td>
                        <td>${club.draw}</td>
                        <td>${club.lost}</td>
                        <td class="gone-max-600">${club.goalsFor}</td>
                        <td class="gone-max-600">${club.goalsAgainst}</td>
                        <td class="gone-max-600">${club.goalDifference}</td>
                        <td>${club.points}</td>
                        </tr>
                      `
                    })
                
                  
                
              });
              // // Sisipkan komponen card ke dalam elemen dengan id #content
              document.getElementById("table-body-standing").innerHTML = clubHTML;
            })
          }
        })
      }

   

  fetch(base_url + "competitions/2001/standings",{
      method: "GET",
      headers: {
        "X-Auth-Token": "ed9c510b1f46493080d2754951543900"
      }
    })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      var standingData = "";
      standingData = data.standings.filter(d => d.type == "TOTAL");
      
      var clubHTML = "";
      standingData.forEach(function(standing) {
        
          clubHTML += `
              <tr>
                <td colspan="10" style="text-align: left; padding-left: 15px; font-weight: bold; background-color: teal;color: white;">${standing.group.replace("_", " ")}</td>
              </tr>
            `;
            standing.table.forEach(function(club){
              clubHTML += `
                 <tr>
                 <td>${club.position}</td>
                 <td >
                 <a href="/pages/detail-team.html?id=${club.team.id}" class="td-logo-name-club">
                   <img
                     src="${club.team.crestUrl}"
                     class="logo-team"
                   />
                   <p class="td-team-name">${club.team.name}</p>
                   </a>
                 </td>
                 <td>${club.playedGames}</td>
                 <td>${club.won}</td>
                 <td>${club.draw}</td>
                 <td>${club.lost}</td>
                 <td class="gone-max-600">${club.goalsFor}</td>
                 <td class="gone-max-600">${club.goalsAgainst}</td>
                 <td class="gone-max-600">${club.goalDifference}</td>
                 <td>${club.points}</td>
                 </tr>
               `
             })
        
          
        
      });
      // // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("table-body-standing").innerHTML = clubHTML;
    })
    .catch(error);
}

function getDetailClub() {
  
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ('caches' in window) {
      caches.match(base_url + "teams/"+idParam).then(function(response) {
        if (response) {
          response.json().then(function (data) {
            var detailHTML = "";
      
            detailHTML += `
            <div class="section">
                <div class="center-align">
                    <img src="${data.crestUrl}" class="responsive-img" style="width: 100px; height: auto;" alt="Logo Club">
                    <h5>${data.name}</h5>
                </div>
                <table class="table-phone">
                    <tbody>
                        <tr>
                            <td>Short Name</td>
                            <td>${data.shortName}</td>
                        </tr>
                        <tr>
                            <td>Vanue</td>
                            <td>${data.venue}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>${data.address}</td>
                        </tr>
                        <tr>
                            <td>phone</td>
                            <td>${data.phone}</td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td>${data.website}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>${data.email}</td>
                        </tr>
                    </thead>
                </table>
            </div>
              `;
              

            // // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content-detail-team").innerHTML = detailHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);

          })
        }
      })
    }
    

 

fetch(base_url + "teams/"+idParam,{
    method: "GET",
    headers: {
      "X-Auth-Token": "ed9c510b1f46493080d2754951543900"
    }
  })
  .then(status)
  .then(json)
  .then(function(data) {
    
    var detailHTML = "";
      
        detailHTML += `
        <div class="section">
            
            <div class="center-align">
                <img src="${data.crestUrl}" class="responsive-img" style="width: 100px; height: auto;">
                <h5>${data.name}</h5>
            </div>
            <table class="table-phone">
                <tbody>
                    <tr>
                        <td>Short Name</td>
                        <td>${data.shortName}</td>
                    </tr>
                    <tr>
                        <td>Vanue</td>
                        <td>${data.venue}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>${data.address}</td>
                    </tr>
                    <tr>
                        <td>phone</td>
                        <td>${data.phone}</td>
                    </tr>
                    <tr>
                        <td>Website</td>
                        <td>${data.website}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>${data.email}</td>
                    </tr>
                </thead>
            </table>
        </div>
          `;
          

    // // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content-detail-team").innerHTML = detailHTML;
    // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
    resolve(data);
  })
  .catch(error);
  
  });
  }

  function getSavedDetailClub(){
    return new Promise(function(resolve, reject) {
      var urlParams = new URLSearchParams(window.location.search);
      var idParam = urlParams.get("id");
      
      getById(parseInt(idParam)).then(function(club) {
        if(club){
          var detailHTML = "";
          
            detailHTML += `
            <div class="section">
                
                <div class="center-align">
                    <img src="${club.crestUrl}" class="responsive-img" style="width: 100px; height: auto;">
                    <h5>${club.name}</h5>
                </div>
                <table class="table-phone">
                    <tbody>
                        <tr>
                            <td>Short Name</td>
                            <td>${club.shortName}</td>
                        </tr>
                        <tr>
                            <td>Vanue</td>
                            <td>${club.venue}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>${club.address}</td>
                        </tr>
                        <tr>
                            <td>phone</td>
                            <td>${club.phone}</td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td>${club.website}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>${club.email}</td>
                        </tr>
                    </thead>
                </table>
            </div>
              `;
              

        // // Sisipkan komponen card ke dalam elemen dengan id #content
         document.getElementById("body-content-detail-team").innerHTML = detailHTML;
          resolve(true);
        }else{
          resolve(false);
        }
        
      });
    });
  }

  function getAllSavedClub(){
    getAllClub().then(function(club) {
      console.log(club);
      // Menyusun komponen card artikel secara dinamis
      var clubHTML = "";
      club.forEach(function(data) {
        clubHTML += `
                    <div class="card p-5">
                      <a href="/pages/detail-team.html?id=${data.id}&saved=true">
                        <div class="card-image waves-effect waves-block waves-light center-align">
                          <img src="${data.crestUrl}" class="logo-team-80" />
                        </div>
                      </a>
                      <div class="card-content center-align">
                        <span class="card-title truncate">${data.name}</span>
                      </div>
                    </div>
                    
                  `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #body-content
      document.getElementById("body-content-saved").innerHTML = clubHTML;
    });
  }

  function getSavedDetailClubById(idParam){
    
    return new Promise(function(resolve, reject) {
      var data = "";
      getById(parseInt(idParam)).then(function(club) {
        if(club){
          resolve(club);
        }
      });
      
    });

  }

