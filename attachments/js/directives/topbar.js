angular.module('registry.controllers').directive('topbar', ['$http', '$location', '$window', '$rootScope', '$routeParams', 'Downloads', function ($http, $location, $window, $rootScope, $routeParams, Downloads) {
    return {
        restrict: 'E',
        templateUrl: '/partials/directives/topbar.html',
        controller:['$scope', '$rootScope', 'SearchService', function($scope, $rootScope, SearchService){
            var currentSearch, currentTerms;
            var searchResults = {};
            $scope.plugins = [];

            $scope.searchText = '';

           
            $scope.search = function(evt) {
                if($location.url().indexOf("search") != -1){
                    currentSearch = $scope.searchText.toLowerCase();
                    SearchService.searchTerm = currentSearch;
                    currentTerms = currentSearch.trim().split(' ');

					//handle updating the url for modern browsers
					if(document.querySelector) {
						$window.location.href = '/#/search?search='+currentSearch;
						document.querySelector("#search-text").focus();
					}
					
                    //todo: add a short timeout to lower number of requests
                    currentTerms.forEach(function(term){
                        if(!searchResults[term]){
                            $http.get('/_list/search/search?startkey='+JSON.stringify(term)+'&endkey='+JSON.stringify(term+'ZZZZZZZZZZZZZZ')+'&limit=25').
                                success(function(data, status, headers, config){
                                    $scope.plugins = data.rows;
                                    //hacky way to assign download counts to plugin
                                    Downloads.getDownloads().then(function(obj){
                                        $scope.downloads = obj.data;
                                        $scope.plugins.forEach(function(element, index, array){
                                            if(!($scope.downloads[element.key])){
                                                array[index].downloads = 0;
                                            }else{
                                                array[index].downloads = $scope.downloads[element.key];
                                            }     
                                        });
                                    });

                                    //todo: save this in session storage instead of object?
                                    searchResults[term] = $scope.plugins;
                                }).
                                error(function(data,status){
                                    console.log(data);
                                    console.log(status);
                                })
                        }else{
                            $scope.plugins = searchResults[term];
                        }
                    })
                }else{
                    //check to see if user pressed enter or hit submit button
                    if ((evt.keyCode === 13) || evt.type === "submit" ){
						console.log('doing this one...');
                        currentSearch = encodeURIComponent($scope.searchText.toLowerCase());
                        //send to search page
                        $window.location.href = '/#/search?search='+currentSearch;
                    }
                }
            }


            $scope.getTotalPlugins = function(){
                //todo: use sessionstorage or turn this into a service to cache results
                $http({method: 'GET', url:('/api/_all_docs?limit=0')}).
                    success(function(data, status, headers, config) {
                        $scope.totalPlugins = data.total_rows - 2;
                    }).
                    error(function(data, status){
                        if (status === 404){
                            console.log('need to redirect to a 404 page')
                        }
                        console.log(status)
                    });

            };
            $scope.getTotalPlugins();

            if($routeParams.search){
                $scope.searchText = $routeParams.search;
                $scope.search();
            }
        }],
        link: function(scope, element, attrs, controller){
        }
    };
}]);
