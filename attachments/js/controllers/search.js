angular.module('registry.controllers').controller('SearchController', ['$rootScope', '$routeParams', '$scope', '$location', '$http', 'SearchService', function($rootScope, $routeParams, $scope, $location, $http, SearchService) {
    
    var results = [];

    $scope.searchText = $routeParams.searchText || SearchService.searchText || '';

    $scope.searchResults = [{
    	package_id: 'org.apache.cordova.device', 
    	name: 'Device',
    	description: 'Pulls device information',
    	version: '0.5.1',
    	downloads: 25617
    }];

    $scope.searchPlugins = function() {
        $location.path('/search/' + $scope.searchText);
    };

}]);