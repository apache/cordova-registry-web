angular.module('registry.controllers').directive('pluginlist', function () {
    return {
        restrict: 'E',
        templateUrl: '/partials/directives/pluginlist.html',
        controller:['$scope', '$rootScope', 'Downloads', function($scope, $rootScope, Downloads){
            Downloads.getDownloads().then(function(obj){
                console.log(obj);
                $scope.downloads = obj.data;
                $scope.downloadsArray = obj.arrData;
            });

            $scope.reverse = null;
	        $scope.orderValue = 'key';

	        $scope.setOrderBy = function setOrderBy (value) {
                console.log(value);
		        $scope.orderValue = value;
		        $scope.reverse = !$scope.reverse;
	        };

        }],
        link: function(scope, element, attrs, controller){
        }
    };
});
