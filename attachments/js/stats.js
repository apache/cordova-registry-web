function clientStats() {
  var url = '/downloads/_design/downloads/_view/byClient?group=true'
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function(e) {
    var res = JSON.parse(xhr.responseText);
    if(res) {
      var data = res.rows;
      var clientStatsEm = document.getElementById('client_stats');
      var plugman = cordova_cli = unknown = total = 0;
      for(var i = 0 ; i < data.length ; i++) {
        total += data[i].value;
        if(data[i].key[1] === 'plugman') {
          plugman += data[i].value;
        } else if(data[i].key[1] === 'cordova-cli') {
          cordova_cli += data[i].value;
        } else {
          unknown += data[i].value;
        }
      }
      var totalEm = document.getElementById('total');
      totalEm.innerHTML = '<h1>Total Downloads: '+total+'</h1>';
      var plugmanPerc = plugman * 100 / total;
      var cordovaCliPerc = cordova_cli * 100 / total;
      var unknownPerc = unknown * 100 / total;
      var html = 'plugman '+Math.round(plugmanPerc)+'%<br/>';
      html += 'cordova-cli '+Math.round(cordovaCliPerc)+'%<br/>';
      html += 'unknown '+Math.round(unknownPerc)+'%<br/>';
      clientStatsEm.innerHTML = html;
    }
  };
  xhr.send();
};

function downloadStats() {
    var url = '/downloads/_design/downloads/_view/byId?group=true';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function(e) {
      var res = JSON.parse(xhr.responseText);
      if(res) {
        var downloads = res.rows;
        var downloadsEm = document.getElementById('downloads');
        downloads.sort(function(a,b) { return b.value - a.value; });
        for(var i = 0 ; i < downloads.length ; i++) {
          var row = document.createElement('tr');
          var rank = i+1;
          row.innerHTML = '<td>'+rank+'</td><td>'+downloads[i].key+'</td>'+'<td>'+downloads[i].value+'</td>';
          downloadsEm.appendChild(row); 
        }
        clientStats();
        } else {
          document.getElementById('total').innerHTML = "Cannot get download data :-("
        }
    };
    xhr.send();
}

$(document).ready(function() {
  downloadStats();
});

//window.addEventListener('load', function load(event) {
//  window.removeEventListener('load');
//  downloadStats();
//}, false);
