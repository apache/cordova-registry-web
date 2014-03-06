angular.module('registry.controllers').directive('topbar', function ($http, $location, $window, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: '/partials/directives/topbar.html',
        controller:['$scope', '$rootScope', function($scope, $rootScope){
            
            $scope.searchText = '';

            $scope.search = function(evt){
                var currentSearch = encodeURIComponent($scope.searchText.toLowerCase());
                $window.location.href = '/#/search?search='+currentSearch;
            }

            $scope.getTotalPlugins = function(){
                //todo: use sessionstorage or turn this into a service to cache results
                $http({method: 'GET', url:('/api/_all_docs?limit=0')}).
                    success(function(data, status, headers, config) {
                        $scope.totalPlugins = data.total_rows - 4;
                    }).
                    error(function(data, status){
                        if (status === 404){
                            console.log('need to redirect to a 404 page')
                        }
                        console.log(status)
                    });

            };
            $scope.getTotalPlugins();
        }],
        link: function(scope, element, attrs, controller){
        }
    };
});
