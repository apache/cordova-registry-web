angular.module('registry.controllers').controller('ViewAllController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
    
    $scope.loading = true;    

    $scope.getPlugins = function(){
        $http.get('/_view/searcher/').
                success(function(data, status, headers, config) {
                    $scope.plugins = data.rows;
                    $scope.loading = false;
                    //hacky way to assign download counts to plugin
                    $scope.plugins.forEach(function(element, index, array){
                        if(!($scope.downloads[element.id])){
                            array[index].downloads = 0;
                        }else{
                            array[index].downloads = $scope.downloads[element.id];
                        }
                    });
                    console.log($scope.plugins);
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
