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
    'chart.js',
    'ui.select'
  ])
  .config(['$sceDelegateProvider','$stateProvider', '$urlRouterProvider', '$locationProvider', function ($sceDelegateProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['**']);
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
  }])
  .run(['$rootScope','$state','$stateParams','RSUtils', function ($rootScope, $state, $stateParams, RSUtils) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.allItemsList = [];
    RSUtils.getAllItems().then(function(response) {
      for(var id in response.data) {
        var item = response.data[id];
        angular.extend(item, {
          icon: "http://services.runescape.com/m=itemdb_oldschool/1504002634353_obj_sprite.gif?id=" + id
        });
        $rootScope.allItemsList.push(item);
      }
    });
  }]);
