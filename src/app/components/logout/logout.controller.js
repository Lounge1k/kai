(function() {
  'use strict';

  angular
    .module('kai')
    .controller('LogoutController', LogoutController);

    function LogoutController($http, $scope, $location, $rootScope, storage){
      var store = storage.getStore('common')
        var token = $rootScope.token;
        if (token) {
          $rootScope.authorized = true;
        } else {
          $rootScope.authorized = false;
        }

        $rootScope.title = 'Logout';

        $http({
            method: 'POST',
            url: 'http://kai-solutions.com/api/v1/profile/logout/',
        }).then(function(response){
          $rootScope.token = undefined;
          $rootScope.profileId = undefined;
          store.removeItem('token');
          store.removeItem('profileId');
          $location.path('/');
        }).catch(function(err){
          if (err.status === 400) {
              $scope.loginError = err.message;
          }
          if (err.status === 401) {
              $location.path('/login');
          } else {
              console.error(err);
          }
        });
    }

})();
