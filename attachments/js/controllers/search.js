angular.module('registry.controllers').controller('SearchController', ['$rootScope', '$routeParams', '$scope', '$location', '$http', function($rootScope, $routeParams, $scope, $location, $http) {
    
    var results = [];
    var currentSearch, currentTerms;
    var searchResults = {};
    $scope.plugins = null;

    $scope.searchText = '';

    $scope.searchResults = [{
    	package_id: 'org.apache.cordova.device', 
    	name: 'Device',
    	description: 'Pulls device information',
    	version: '0.5.1',
    	downloads: 25617
    }];

    $scope.searchPlugins = function() {
        //console.log($scope.searchText);
        currentSearch = $scope.searchText.toLowerCase();
        currentTerms = currentSearch.trim().split(' ');
        console.log(currentTerms);

        currentTerms.forEach(function(term){
            if(!searchResults[term]){
                $http.get('/_list/search/search?startkey='+JSON.stringify(term)+'&endkey='+JSON.stringify(term+'ZZZZZZZZZZZZZZ')+'&limit=25').
                    success(function(data, status, headers, config){
                        //console.log(data);
                        $scope.plugins = data.rows;
                        console.log($scope.plugins);
                        console.log($scope.plugins[0].value._id);
                    }).
                    error(function(data,status){
                        console.log(data);
                        console.log(status);
                    })
            }
        })
    };

}]);
