angular.module('registry.controllers').controller('PackageDetailsController', ['$rootScope', '$scope', '$location', '$routeParams', '$http', function($rootScope, $scope, $location, $routeParams, $http) 
{
    console.log(marked('im using marked'));
    $scope.packageID = $routeParams.id
    $scope.description = null;
    $scope.version = null;
    $scope.maintainers = null;
    $scope.repo = null;
    $scope.issues = null;
    $scope.keywords = null;
    $scope.readme = null;
    $scope.license = null;
    $scope.engine = null;
    $scope.lastupdated = null;
    $scope.downloads = null;

    $scope.getPackage = function(){
        console.log($scope.packageID);
        $http({method: 'GET', url:('/api/' + $scope.packageID)}).
                success(function(data, status, headers, config) {
                    $scope.data = data;
                    $scope.description = $scope.data.description;
                    $scope.readme = marked($scope.data.readme);
                    console.log(data);
                }).
                error(function(data, status){
                    if (status === 404){
                        console.log('need to redirect to a 404 page')
                    }
                    console.log(status)
                });

    }
    $scope.getPackage();
}]);
