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

service.factory('prettyDate', function() {
    /*
     * JavaScript Pretty Date
     * Copyright (c) 2011 John Resig (ejohn.org)
     * Licensed under the MIT and GPL licenses.
     */
    // Takes an ISO time and returns a string representing how
    // long ago the date represents.
    var prettyDate = function(time){
    	var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
    		diff = (((new Date()).getTime() - date.getTime()) / 1000),
    		day_diff = Math.floor(diff / 86400);

    	if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
    		return;

    	return day_diff == 0 && (
    			diff < 60 && "just now" ||
    			diff < 120 && "1 minute ago" ||
    			diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
    			diff < 7200 && "1 hour ago" ||
    			diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
    		day_diff == 1 && "Yesterday" ||
    		day_diff < 7 && day_diff + " days ago" ||
    		day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
    }
    return prettyDate;
});

