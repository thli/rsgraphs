(function() {
  'use strict';

  angular.module('rsgraphsApp').factory('RSUtils', RSUtilsFactory);

  RSUtilsFactory.$inject = ['$http'];

  function RSUtilsFactory($http) {
    return {
      getInfo : getInfo,
      getPrices: getPrices,
      getAllItems: getAllItems
    };

    function getInfo(itemID) {
      var config = {
        params: {
          item:itemID
        }
      };
      return $http.get('https://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json', config);
    }

    function getPrices(itemID) {
      var config = {
        params: {
          a:'graph',
          i:itemID,
          g:30,
          start: moment().subtract(3, 'weeks').valueOf()
        }
      };

      return $http.get('https://api.rsbuddy.com/grandExchange', config);
    }

    function getAllItems() {
      return $http.get('https://rsbuddy.com/exchange/summary.json');
    }
  }
})();
