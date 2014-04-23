angular.module('registry.controllers').controller('PackageDetailsController', ['$rootScope', '$scope', '$location', '$routeParams', '$http', 'SearchService', 'Downloads', function($rootScope, $scope, $location, $routeParams, $http, SearchService, Downloads) 
{
    $scope.packageID = $routeParams.id
    $scope.description = null;
    $scope.versions = null;
    $scope.maintainers = null;
    $scope.repo = null;
    $scope.issue = null;
    $scope.keywords = null;
    $scope.readme = null;
    $scope.englishdoc = null;
    $scope.license = null;
    $scope.engines = null;
    $scope.lastupdated = null;
    $scope.downloads = null;
    $scope.latestVersion = null;
    $scope.currentVersion = null;
    $scope.platforms = null;
    $scope.keywords = null;

    $scope.backToSearch = function backToSearch() {
        if(SearchService.getSearch() == '') {
            window.history.back();    
        } else {
            window.location.href = '/#/search?search=' + SearchService.getSearch();
        }
        
    };

    Downloads.getDownloads().then(function(obj){
        $scope.downloads = obj.data;
    });

    $scope.getPackage = function(){
        $http({method: 'GET', url:('/api/' + $scope.packageID)}).
                success(function(data, status, headers, config) {
                    $scope.data = data;
                    //console.log($scope.data);
                    $scope.description = $scope.data.description;
                    $scope.latestVersion = $scope.data['dist-tags'].latest;
                    $scope.currentVersion = $scope.latestVersion;
                    $scope.issue = $scope.data.versions[$scope.currentVersion].issue;
                    $scope.repo = $scope.data.versions[$scope.currentVersion].repo;
                    $scope.maintainers = $scope.data.versions[$scope.currentVersion].maintainers;
                    $scope.platforms = $scope.data.versions[$scope.currentVersion].platforms;
                    $scope.keywords = $scope.data.versions[$scope.currentVersion].keywords;
                    $scope.versions = $scope.data.versions;
                    $scope.engines = $scope.data.versions[$scope.currentVersion].engines;
                    $scope.license = $scope.data.versions[$scope.currentVersion].license;
                    $scope.lastupdated = moment($scope.data.time.modified).fromNow();
                    $scope.readme = marked($scope.data.readme);
                    if($scope.data.versions[$scope.currentVersion].englishdoc){
                        $scope.englishdoc = marked($scope.data.versions[$scope.currentVersion].englishdoc);
                    }
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
