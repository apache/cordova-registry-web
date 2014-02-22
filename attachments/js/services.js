console.log('hi');
angular.module('registry.services', []).factory('Downloads', ['$http', '$window', function($http, $window) {
        console.log('here');
        
        var downloads = $window.sessionStorage.getItem("Downloads") ? JSON.parse($window.sessionStorage.getItem("Downloads")) : {data:{}};
        var refresh_data_from_couchdb = function() {
            $http.get('/downloads/_design/downloads/_view/byId?group=true').
              success(function(data) {

                data.rows.forEach(function(d){
                    downloads.data[d.key] = d.value;
                });
                downloads.timestamp = new Date().valueOf();
                $window.sessionStorage.setItem("Downloads", JSON.stringify(downloads));
            }).error(function(data) {
                console.log('error loading downloads data!');
            });
        }
        if(downloads){
            if (!downloads.timestamp) {
                refresh_data_from_couchdb();
            } else {
                var a_week_ago = 1000*60*60*24*7;
                var now = new Date().valueOf();
                if (downloads.timestamp < (now - a_week_ago)) {
                    console.log('download data old, refreshing');
                    refresh_data_from_couchdb();
                }
            }
        }
        console.log(downloads);
        return downloads;
    }]);
