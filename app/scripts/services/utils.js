(function() {
  'use strict';

  angular.module('rsgraphsApp').factory('RSUtils', RSUtilsFactory);

  RSUtilsFactory.$inject = ['$http'];

  function RSUtilsFactory($http) {
    return {
      getInfo : getInfo,
      getPrices: getPrices
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
          start: moment().subtract(1, 'weeks').valueOf()
        }
      };

      console.log(config.params.start);
      return $http.get('https://api.rsbuddy.com/grandExchange', config);
    }

  }
})();
