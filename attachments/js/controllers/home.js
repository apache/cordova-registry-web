angular.module('registry.controllers').controller('HomeController', ['$rootScope', '$scope', '$location', '$http','Downloads', 'prettyDate',  function($rootScope, $scope, $location, $http, Downloads, prettyDate) {
    
    $scope.totalPlugins = 0;

    $scope.mostDownloaded = [];
    $scope.lastUpdated = [];
    
    

    $scope.getTotalPlugins = function(){
        //console.log($scope.packageID);
        var apiCallUrl = '/api/_all_docs?limit=0';
        //var apiCallUrl = '/plugins.json';

        $http({method: 'GET', url:(apiCallUrl)}).
                success(function(data, status, headers, config) {
                    $scope.totalPlugins = data.total_rows - 3;
                }).
                error(function(data, status){
                    if (status === 404){
                        console.log('need to redirect to a 404 page')
                    }
                    console.log(status)
                });

    };

    $scope.getMostDownloaded = function() {
        Downloads.getDownloads().then(function(obj){
            $scope.mostDownloaded = obj.slice(0, 9);
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

    $scope.getTotalPlugins();
    $scope.getMostDownloaded();
    $scope.getLastUpdated();
}]);
