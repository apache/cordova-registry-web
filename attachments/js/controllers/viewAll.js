angular.module('registry.controllers').controller('ViewAllController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
    
    $scope.loading = true;    

    $scope.getPlugins = function(){
        $http({method: 'GET', url:('/api/_all_docs?include_docs=true&skip=3')}).
                success(function(data, status, headers, config) {
                    $scope.plugins = data.rows;
                    $scope.loading = false;
                    $scope.plugins.forEach(function(element, index, array){
                        if(!($scope.downloads[element.id])){
                            array[index].downloads = 0;
                        }else{
                            array[index].downloads = $scope.downloads[element.id];
                        }
                    });
                }).
                error(function(data, status){
                    if (status === 404){
                        //todo: setup a 404 page
                        console.log('need to redirect to a 404 page')
                    }
                    console.log(status)
                });

    }
    $scope.getPlugins();
}]);
