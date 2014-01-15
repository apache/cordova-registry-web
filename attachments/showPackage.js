function getPackage(){
var id = window.location.href.split('/#/')[1]
var url = '/api/'+id;
var xhr = new XMLHttpRequest();
var content = '';
  xhr.open('GET', url, true);
  xhr.onload = function(e) {
    var res = JSON.parse(xhr.responseText);
    if(res){
        console.log(res);
        content += '<div class="package-label">Plugin ID</div><div class="package-title">'+res._id+'</div><div class="spacer"></div>'
        content += '<div class="package-label">Plugin Description</div><div class="package-description">'+res.description+'</div>'

        console.log(content);
        document.getElementById('package').innerHTML = content;

    }
  };
  xhr.send();

}

$(document).ready(function() {
  getPackage();
});
