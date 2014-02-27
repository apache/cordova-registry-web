angular.module('registry.services', []).factory('Downloads', function($http, $window, $q) {
    
    var promise;
    var Downloads = {
    getDownloads:function(){
        //var downloads = $window.sessionStorage.getItem("Downloads") ? JSON.parse($window.sessionStorage.getItem("Downloads")) : {data:{}, arrData:[]};
        //var a_week_ago = 1000*60*60*24*7;
        //var now = new Date().valueOf();
                    
        //console.log("arraylength: " + downloads.arrData.length);
        //if (downloads.arrData.length === 0 || !downloads.timestamp || (downloads.timestamp < (now - a_week_ago)))
        if (!promise){
            promise = $http.get('/downloads/_design/downloads/_view/byId?group=true').then(function(data) {
                var downloads = {data:{}, arrData:[]};
                data.data.rows.forEach(function(d){
                    downloads.data[d.key] = d.value;
                    downloads.arrData.push({key:d.key, value:d.value});
                });
                downloads.timestamp = new Date().valueOf();
                downloads.arrData.sort(function(a, b) {
                    if (a.value < b.value){
                        return 1;
                    }
                    if (a.value > b.value){
                        return -1;
                    }
                    //a must be equal to b
                    return 0;
                });
                //$window.sessionStorage.setItem("Downloads", JSON.stringify(downloads));
                return downloads.arrData;
            });
        }
        return promise;
    }
    };

    return Downloads;
});
