'use strict';

/**
 * @ngdoc overview
 * @name rsgraphsApp
 * @description
 * # rsgraphsApp
 *
 * Main module of the application.
 */
angular
  .module('rsgraphsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'chart.js'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashCtrl'
      })
      .state('graph', {
        url: '/graph/:id',
        templateUrl: 'views/graph.html',
        controller: 'GraphCtrl',
        controllerAs: 'graphCtrl'
      });

    $urlRouterProvider.otherwise('/');
  }]);
