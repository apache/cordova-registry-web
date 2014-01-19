angular.module('registry.controllers').controller('HomeController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {
    
    $scope.totalPlugins = 0;
    
    $scope.getTotalPlugins = function(){
        //console.log($scope.packageID);
        $http({method: 'GET', url:('/api/_all_docs?limit=0')}).
                success(function(data, status, headers, config) {
                    $scope.totalPlugins = data.total_rows - 3;
                }).
                error(function(data, status){
                    if (status === 404){
                        console.log('need to redirect to a 404 page')
                    }
                    console.log(status)
                });

    }
    $scope.getTotalPlugins();

}]);
