//Search service
'use strict';

angular.module('registry').service('SearchService', ['$q', '$rootScope', '$routeParams', '$http', function($q, $rootScope, $routeParams, $http) {

	this.searchText = $routeParams.searchText || '';

}]);