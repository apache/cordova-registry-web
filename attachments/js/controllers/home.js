angular.module('registry.controllers').controller('HomeController', ['$rootScope', '$scope', '$location', '$http','Downloads', 'prettyDate', function($rootScope, $scope, $location, $http, Downloads, prettyDate) {
    
    $scope.totalPlugins = 0;

    $scope.mostDownloaded = [];
    $scope.lastUpdated = [];
    
    

    $scope.getMostDownloaded = function() {
        Downloads.getDownloads().then(function(obj){
            $scope.mostDownloaded = obj.arrData.slice(0, 9);
        });
    };

    $scope.getLastUpdated = function() {
        $http.get('/_view/updated?descending=true&limit=10&include_docs=false').then(function(promise){
            promise.data.rows.forEach(function(obj){
                obj.key = prettyDate(obj.key);
            });
            $scope.lastUpdated = promise.data.rows;
        })
    };

    $scope.getMostDownloaded();
    $scope.getLastUpdated();
}]);
