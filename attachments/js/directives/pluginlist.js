angular.module('registry.controllers').directive('pluginlist', function () {
    return {
        restrict: 'E',
        templateUrl: '/partials/directives/pluginlist.html',
        controller:['$scope', '$rootScope', 'Downloads', function($scope, $rootScope, Downloads){
            Downloads.getDownloads().then(function(obj){
                $scope.downloads = obj.data;
            });
        }],
        link: function(scope, element, attrs, controller){
        }
    };
});
