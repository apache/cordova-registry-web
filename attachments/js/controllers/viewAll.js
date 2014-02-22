angular.module('registry.controllers').controller('ViewAllController', ['$rootScope', '$scope', '$location', '$http', 'Downloads' , function($rootScope, $scope, $location, $http, Downloads) {
    
    $scope.totalPlugins = null;
    $scope.downloads = Downloads.data;
    
    $scope.getPlugins = function(){
        $http({method: 'GET', url:('/api/_all_docs?include_docs=true&limit=100&skip=3')}).
                success(function(data, status, headers, config) {
                    console.log(data);
                    $scope.plugins = data.rows;
                    console.log($scope.plugins)
                    console.log($scope.plugins[0].doc.description)
                    console.log($scope.plugins[0].doc['dist-tags'].latest)
                }).
                error(function(data, status){
                    if (status === 404){
                        console.log('need to redirect to a 404 page')
                    }
                    console.log(status)
                });

    }
    $scope.getPlugins();

}]);
