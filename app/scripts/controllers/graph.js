'use strict';

/**
 * @ngdoc function
 * @name rsgraphsApp.controller:GraphCtrl
 * @description
 * # GraphCtrl
 * Controller of the rsgraphsApp
 */
angular.module('rsgraphsApp')
  .controller('GraphCtrl', function () {
    var vm = this;
    vm.item = {
      name: 'Dragon Claws',
      buyPrice: '60,000,000',
      sellPrice: '60,302,111',
      volume: '25',
      buyVolume: '13',
      sellVolume: '12'
    };
  });
