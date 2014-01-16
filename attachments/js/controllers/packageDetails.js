angular.module('registry.controllers').controller('PackageDetailsController', ['$rootScope', '$scope', '$location', '$routeParams', '$http', function($rootScope, $scope, $location, $routeParams, $http) {

    $scope.packageID = $routeParams.id

    $scope.getPackage = function(){
        console.log($scope.packageID);
        $http({method: 'GET', url:('/api/' + $scope.packageID)}).
                success(function(data, status, headers, config) {
                    console.log(data);
                });

    }
    $scope.getPackage();

}]);
