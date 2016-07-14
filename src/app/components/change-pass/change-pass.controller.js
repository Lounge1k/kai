(function() {
  'use strict';

  angular
    .module('kai')
    .controller('ChangePassController', changePassController);

    function changePassController($http, $scope, $location, $rootScope, storage){

      var store = storage.getStore('common');
      var token = store.getItem('token');
      if (token) {
          $rootScope.authorized = true;
      } else {
          $rootScope.authorized = false;
          console.log('Redirect to login')
          $location.path('/login');
          return;
      }

      $rootScope.title = 'Sign in';


      $scope.onChange = function($event){
        $event.preventDefault();
        $http.defaults.headers.common.Authorization = token;
        $http({
            method: 'POST',
            url: 'http://kai-solutions.com/api/v1/profile/password_change/',
            data: {
                new_password: $scope.password
            }
        }).then(function(response){
          $rootScope.token = undefined;
          $rootScope.profileId = undefined;
          store.removeItem('token');
          store.removeItem('profileId');
          $location.path('/');
        }).catch(function(err){
          console.error('Error', err)
          $scope.changeError = err.data.message;
        });
      };
    }

})();
