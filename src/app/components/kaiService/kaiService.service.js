(function() {
  'use strict';

  angular
    .module('kai')
    .factory('kaiService', kaiService);

  /** @ngInject */
  function kaiService($log, $http) {
    var apiHost = 'http://kai-solutions.com/api/v1/';

    var service = {
      apiHost: apiHost,
      getCompanies: getCompanies
    };

    return service;

    function getCompanies() {
      return $http.get(apiHost + 'company/')
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          $log.error('XHR Failed for getCompanies.\n' + angular.toJson(error.data, true));
        });
    }
  }
})();
