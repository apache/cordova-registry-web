'use strict';

// Declare app level module and its dependencies.
angular.module('registry', ['ngRoute', 'registry.controllers']).
    // Set up routes on the client side
    config(['$routeProvider', '$locationProvider', function($route, $location) {
        $route.
            when('/home', {templateUrl:'/partials/views/home.html', controller:'HomeController'}).
            otherwise({redirectTo: '/home'});
       // $location.html5Mode(true); // use pushState instead of hash for urls
       
    }]).
    // Initialization function for the app
    run(['$rootScope', function ($rootScope) {
    }]);
