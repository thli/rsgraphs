(function() {
  'use strict';
  angular.module('rsgraphsApp').controller('GraphCtrl', GraphController);

  GraphController.$inject =['RSUtils', '$stateParams', '$filter'];

  function GraphController(RSUtils, $stateParams, $filter) {
    var vm = this;

    function onload() {
      var id = $stateParams.id;

      RSUtils.getInfo(id).then(function(response) {
        vm.item = response.data.item;
      });

      RSUtils.getPrices(id).then(function(response) {
        vm.data = response.data;
        vm.dates = vm.data.map(function(data) {
          return $filter('date')((data.ts), 'MMM dd - h:mm a');
        });

        vm.buyPrice = vm.data.map(function(data) {
          if(data.buyingPrice === undefined) {
            return undefined;
          }
          return data.buyingPrice;
        });
        vm.sellPrice = vm.data.map(function(data) {
          if(data.sellingPrice === undefined) {
            return undefined;
          }
          return data.sellingPrice;
        });
        vm.buyVolume = vm.data.map(function(data) {
          return data.buyingCompleted;
        });
        vm.sellVolume = vm.data.map(function(data) {
          return data.sellingCompleted;
        });

        vm.series = ['Buy Price', 'Sell Price'];
        vm.chartData = [vm.buyPrice, vm.sellPrice];
        vm.timestamps = angular.copy(vm.dates);
        vm.dateRange = vm.buyPrice.length;
//        console.log(vm.series);
//        console.log(vm.chartData);

        vm.options = {
          spanGaps: true,
          pointRadius: 1,
          scales: {
            yAxes: [{
              ticks: {
                callback: function(number) {
                  return $filter('number')(number);
                }
              }
            }]
          }
        };
      });
    }

    onload();

    vm.isNotUndefined = function(value, index, array) {
      return value!==undefined;
    };

    vm.logData = function() {
      console.log(vm.chartData);
    };


    vm.updateData = function(periods) {
      console.log('updating data range to : ' + periods);

      if(periods === 0) {
        vm.chartData = [vm.buyPrice, vm.sellPrice];
        vm.timestamps = angular.copy(vm.dates);
      } else {
        vm.chartData = [
          $filter('limitTo')(vm.buyPrice, periods),
          $filter('limitTo')(vm.sellPrice, periods)
        ];

        vm.timestamps = $filter('limitTo')(angular.copy(vm.dates), periods);
      }

      console.log(vm.chartData);
    };
  }
})();
