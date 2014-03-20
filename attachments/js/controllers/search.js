angular.module('registry.controllers').controller('SearchController', ['$rootScope', '$scope', 'SearchService', function($rootScope, $scope, SearchService) {

	$scope.filter = [];
	$scope.showFilters = false;
	$scope.hideFilters = true;

	$scope.filteriOS = false;
	$scope.filterAndroid = false;
	$scope.filterWindowsPhone7 = false;
	$scope.filterWindowsPhone8 = false;
	$scope.filterWindows8 = false;
	$scope.filterFirefox = false;
	$scope.filterBlackberry = false;

	$scope.searchTerm = SearchService.getSearch();

	$scope.selectedPlatforms = function() {
		//send back null if we arent showing filters
		if(!$scope.showFilters) {
			return null;
		}

		var platformFilters = [];
	    // "firefoxos"
		// "android"
		// "amazon-fireos"
		// "ubuntu"
		// "ios"
		// "blackberry10"
		// "wp7"
		// "wp8"
		// "windows8"
		if($scope.filterFirefox) {
			platformFilters.push('firefoxos');
		}
		if($scope.filterAndroid) {
			platformFilters.push('android');
		}
		if($scope.filterFireOs) {
			platformFilters.push('amazon-fireos');
		}
		if($scope.filterUbuntu) {
			platformFilters.push('ubuntu');
		}
		if($scope.filteriOS) {
			platformFilters.push('ios');
		}
		if($scope.filterBlackberry) {
			platformFilters.push('blackberry10');
		}
		if($scope.filterWindows7) {
			platformFilters.push('wp7');
		}
		if($scope.filterWindows8) {
			platformFilters.push('wp8');
		}
		if($scope.filterWindows8) {
			platformFilters.push('windows8');
		}

		return platformFilters;
	};

	$scope.toggleFilters = function toggleFilters() {
		$scope.hideFilters = $scope.showFilters;
		$scope.showFilters = !($scope.showFilters);
	};
    
}]);
