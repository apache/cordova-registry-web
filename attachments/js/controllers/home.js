angular.module('registry.controllers').controller('HomeController', ['$rootScope', '$scope', '$location', '$http','Downloads', function($rootScope, $scope, $location, $http, Downloads) {
    
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
        $scope.lastUpdated = [
            { updated: 21865, bundle_id: 'org.apache.cordova.device' }, 
            { updated: 15250, bundle_id: 'org.apache.cordova.inappbrowser' }, 
            { updated: 14761, bundle_id: 'org.apache.cordova.file' }, 
            { updated: 12974, bundle_id: 'org.apache.cordova.console' }, 
            { updated: 11459, bundle_id: 'org.apache.cordova.camera' }, 
            { updated: 10755, bundle_id: 'org.apache.cordova.splashscreen' }, 
            { updated: 10441, bundle_id: 'org.apache.cordova.network-information' }, 
            { updated: 10307, bundle_id: 'org.apache.cordova.dialogs' }, 
            { updated: 9016, bundle_id: 'org.apache.cordova.geolocation' }, 
            { updated: 6139, bundle_id: 'org.apache.cordova.file-transfer' }
        ];
    };

    $scope.getTotalPlugins();
    $scope.getMostDownloaded();
    $scope.getLastUpdated();
}]);
