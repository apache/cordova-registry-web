angular.module('registry.controllers').controller('HomeController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {
    
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
        $scope.mostDownloaded = [ 
            { download_count: 21865, bundle_id: 'org.apache.cordova.device' }, 
            { download_count: 15250, bundle_id: 'org.apache.cordova.inappbrowser' }, 
            { download_count: 14761, bundle_id: 'org.apache.cordova.file' }, 
            { download_count: 12974, bundle_id: 'org.apache.cordova.console' }, 
            { download_count: 11459, bundle_id: 'org.apache.cordova.camera' }, 
            { download_count: 10755, bundle_id: 'org.apache.cordova.splashscreen' }, 
            { download_count: 10441, bundle_id: 'org.apache.cordova.network-information' }, 
            { download_count: 10307, bundle_id: 'org.apache.cordova.dialogs' }, 
            { download_count: 9016, bundle_id: 'org.apache.cordova.geolocation' }, 
            { download_count: 6139, bundle_id: 'org.apache.cordova.file-transfer' }
        ];
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
