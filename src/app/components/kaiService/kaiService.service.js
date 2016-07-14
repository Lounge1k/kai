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
      createCompany: createCompany,
      saveCompany: saveCompany,
      removeCompany: removeCompany,
      getProfile: getProfile,
      createProfile: createProfile,
      saveProfile: saveProfile
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

    function createCompany(company) {
      return $http.post(apiHost + 'company/', company)
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          $log.error('XHR Failed for createCompany.\n' + angular.toJson(error.data, true));
        });
    }

    function saveCompany(company) {
      return $http.put(apiHost + 'company/'+company.id+'/', company)
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          $log.error('XHR Failed for saveCompany.\n' + angular.toJson(error.data, true));
        });
    }

    function removeCompany(companyId) {
      return $http.delete(apiHost + 'company/'+company.id+'/')
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          $log.error('XHR Failed for removeCompany.\n' + angular.toJson(error.data, true));
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

    function createProfile(profile) {
      return $http.post(apiHost + 'profile/', profile)
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          $log.error('XHR Failed for createProfile.\n' + angular.toJson(error.data, true));
        });
    }

    function saveProfile(profile) {
      return $http.put(apiHost + 'profile/'+profile.id+'/', profile)
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          $log.error('XHR Failed for saveProfile.\n' + angular.toJson(error.data, true));
        });
    }

  }
})();
