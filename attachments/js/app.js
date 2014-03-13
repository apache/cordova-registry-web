'use strict';

// Declare app level module and its dependencies.
angular.module('registry', ['ngRoute', 'registry.controllers', 'ngSanitize', 'registry.services']).
    // Set up routes on the client side
    config(['$routeProvider', '$locationProvider', function($route) {
        $route.
            when('/', {templateUrl:'/partials/views/home.html', controller:'HomeController'}).
            when('/viewAll', {templateUrl:'/partials/views/viewAll.html', controller:'ViewAllController'}).
            when('/package/:id', {templateUrl:'/partials/views/packageDetails.html', controller:'PackageDetailsController'}).
            when('/search', {templateUrl:'/partials/views/search.html', controller:'SearchController'});
           // otherwise({redirectTo: '/'});
       
      }]).

// Initialization function for the app
run(['$rootScope', function ($rootScope) {}]);
