angular.module('registry.controllers').controller('ViewAllController', ['$rootScope', '$scope', '$http', 'Downloads', function($rootScope, $scope, $http, Downloads) {
    
    $scope.loading = true;    

	$scope.showFilters = false;
	$scope.hideFilters = true;

	$scope.filteriOS = false;
	$scope.filterAndroid = false;
	$scope.filterWindowsPhone7 = false;
	$scope.filterWindowsPhone8 = false;
	$scope.filterWindows8 = false;
	$scope.filterFirefox = false;
	$scope.filterBlackBerry = false;
	$scope.filterUbuntu = false;
	$scope.filterBrowser = false;

	$scope.selectedPlatforms = function() {
		//send back null if we arent showing filters
		if(!$scope.showFilters) {
			return null;
		}

		var platformFilters = [];
		if($scope.filterFirefox) {
			platformFilters.push('firefoxos');
		}
		if($scope.filterAndroid) {
			platformFilters.push('android');
		}
		if($scope.filterFireOS) {
			platformFilters.push('amazon-fireos');
		}
		if($scope.filterUbuntu) {
			platformFilters.push('ubuntu');
		}
		if($scope.filteriOS) {
			platformFilters.push('ios');
		}
		if($scope.filterBlackBerry) {
			platformFilters.push('blackberry10');
		}
		if($scope.filterWindowsPhone7) {
			platformFilters.push('wp7');
		}
		if($scope.filterWindowsPhone8) {
			platformFilters.push('wp8');
		}
		if($scope.filterWindows8) {
			platformFilters.push('windows8');
		}
		if($scope.filterBrowser) {
			platformFilters.push('browser');
		}

		return platformFilters;
	};
	
    $scope.getPlugins = function(){
        $http.get('/_view/searcher/').
                success(function(data, status, headers, config) {
                    $scope.plugins = data.rows;
                    $scope.loading = false;
                    //hacky way to assign download counts to plugin
                    Downloads.getDownloads().then(function(obj){
                        $scope.downloads = obj.data;
                        $scope.plugins.forEach(function(element, index, array){
                            if(!($scope.downloads[element.id])){
                                array[index].downloads = 0;
                            }else{
                                array[index].downloads = $scope.downloads[element.id];
                            }
                        });
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
	
	$scope.toggleFilters = function toggleFilters() {
		$scope.hideFilters = $scope.showFilters;
		$scope.showFilters = !($scope.showFilters);
	};
	
}]);
