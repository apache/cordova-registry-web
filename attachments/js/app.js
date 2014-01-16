'use strict';

// Declare app level module and its dependencies.
angular.module('registry', ['ngRoute', 'registry.controllers']).
    // Set up routes on the client side
    config(['$routeProvider', '$locationProvider', function($route, $location) {
        $route.
            when('/', {templateUrl:'/partials/views/home.html', controller:'HomeController'}).
            when('/package/:id', {templateUrl:'/partials/views/home.html', controller:'PackageDetailsController'});
           // otherwise({redirectTo: '/'});
       //$location.html5Mode(true); // use pushState instead of hash for urls
       
    }]).
    // Initialization function for the app
    run(['$rootScope', function ($rootScope) {
    }]);
