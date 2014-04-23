service = angular.module('registry.services', []);

angular.module('registry').service('SearchService', function(){
    this.searchTerm = '';

    this.getSearch = function() {
        return this.searchTerm;
    };
});

service.factory('Downloads', function($http, $window, $q) {
    
    var promise;
    var Downloads = {
    getDownloads:function(){
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
                return downloads;
            });
        }
        return promise;
    }
    };
    return Downloads;
});
