angular.module('registry.controllers').controller('SearchController', ['$rootScope', '$routeParams', '$scope', '$location', '$http', 'SearchService', function($rootScope, $routeParams, $scope, $location, $http, SearchService) {
    
    $scope.searchText = $routeParams.searchText || SearchService.searchText || '';

    $scope.searchPlugins = function() {
        $location.path('/search/' + $scope.searchText);
    };

}]);