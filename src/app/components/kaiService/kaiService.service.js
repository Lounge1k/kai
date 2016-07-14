(function() {
  'use strict';

  angular
    .module('kai')
    .factory('kaiService', kaiService);

  /** @ngInject */
  function kaiService($rootScope, $log, $http, storage) {
    var apiHost = 'http://kai-solutions.com/api/v1/';
    var store = storage.getStore('common');
    var token = store.getItem('token');
    $http.defaults.headers.common.Authorization = token;

    var service = {
      apiHost: apiHost,
      getCompanies: getCompanies,
      getProfile: getProfile
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

    function getProfile(profileId) {
      return $http.get(apiHost + 'profile/'+profileId+'/')
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          $log.error('XHR Failed for getProfile.\n' + angular.toJson(error.data, true));
        });
    }

  }
})();
