angular.module('registry.controllers').controller('PackageDetailsController', ['$rootScope', '$scope', '$location', '$routeParams', '$http', 'SearchService', function($rootScope, $scope, $location, $routeParams, $http, SearchService) 
{
    $scope.packageID = $routeParams.id
    $scope.description = null;
    $scope.versions = null;
    $scope.maintainers = null;
    $scope.repo = null;
    $scope.issue = null;
    $scope.keywords = null;
    $scope.readme = null;
    $scope.license = null;
    $scope.engine = null;
    $scope.lastupdated = null;
    $scope.downloads = null;
    $scope.latestVersion = null;
    $scope.currentVersion = "0.2.6";
    $scope.platforms = null;
    $scope.keywords = null;

    $scope.backToSearch = function backToSearch() {
        if(SearchService.getSearch() == '') {
            window.history.back();    
        } else {
            window.location.href = '/#/search?search=' + SearchService.getSearch();
        }
        
    };

    $scope.getPackage = function(){
        console.log($scope.packageID);
        $http({method: 'GET', url:('/api/' + $scope.packageID)}).
                success(function(data, status, headers, config) {
                    $scope.data = data;
                    $scope.description = $scope.data.description;
                    $scope.latestVersion = $scope.data['dist-tags'].latest;
                    $scope.currentVersion = $scope.latestVersion;
                    $scope.issue = $scope.data.versions[$scope.currentVersion].issue;
                    $scope.repo = $scope.data.versions[$scope.currentVersion].repo;
                    $scope.maintainers = $scope.data.versions[$scope.currentVersion].maintainers;
                    $scope.platforms = $scope.data.versions[$scope.currentVersion].platforms;
                    $scope.keywords = $scope.data.versions[$scope.currentVersion].keywords;
                    $scope.versions = $scope.data.versions;
                    console.log(data); 
                    console.log($scope.versions);
                    $scope.readme = marked($scope.data.readme);
                }).
                error(function(data, status){
                    if (status === 404){
                        console.log('need to redirect to a 404 page')
                    }
                    console.log(status)
                });

    }
    $scope.getPackage();
    
    $scope.$watch('currentVersion', function(){
        if($scope.versions){
            $scope.readme = marked($scope.versions[$scope.currentVersion].readme);
            $scope.issue = $scope.data.versions[$scope.currentVersion].issue;
            $scope.repo = $scope.data.versions[$scope.currentVersion].repo;
            $scope.description = $scope.data.versions[$scope.currentVersion].description;
            $scope.maintainers = $scope.data.versions[$scope.currentVersion].maintainers;
            $scope.platforms = $scope.data.versions[$scope.currentVersion].platforms;
            $scope.keywords = $scope.data.versions[$scope.currentVersion].keywords;

            if($scope.currentVersion === $scope.latestVersion){
                $scope.packageID = $routeParams.id
            }else{
                $scope.packageID = $scope.data.versions[$scope.currentVersion]._id;
            }
        }
    });

}]);
