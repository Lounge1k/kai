(function() {
  'use strict';

  angular
    .module('kai')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($rootScope, $scope, $log, $location, kaiService, storage) {
    // var vm = this;
    var store = storage.getStore('common');
    var token = store.getItem('token');
    var profileId = store.getItem('profileId');
    console.log('Token is ', token);
    if (!token) {
        console.log('Redirect to login')
        $location.path('/login');
        return;
    }

    kaiService.getCompanies().then(function(data){
      $scope.companies = data.data;
      // $scope.companies = [];
      console.log('Companies are ', $scope.companies)
    });

    kaiService.getProfile(profileId).then(function(data){
      $scope.profile = data.data;
      console.log('Profile are ', $scope.profile)
    });

    $scope.formatDate = function(date) {
      return moment(date).format("DD MMMM YYYY");
    }

    $scope.getLoggedUser = function() {
      if ($scope.profile) {
        if ($scope.profile.first_name && $scope.profile.last_name) {
          return $scope.profile.first_name + ' ' + $scope.profile.last_name;
        }
        if ($scope.profile.email) {
          return $scope.profile.email;
        }
      }
    }
  }
})();
