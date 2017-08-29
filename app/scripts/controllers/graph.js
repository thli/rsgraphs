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
        vm.timestamps = vm.data.map(function(data) {
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

        console.log(vm.series);
        console.log(vm.chartData);

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

  }
})();
