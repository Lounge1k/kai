(function() {
  'use strict';

  angular
    .module('kai')
    .controller('LoginController', LoginController);

    function LoginController($http, $scope, $location, $rootScope, storage){

      var store = storage.getStore('common');
        var token = $rootScope.token;
        if (token) {
            $rootScope.authorized = true;
        } else {
            $rootScope.authorized = false;
        }

        $rootScope.title = 'Sign in';


        $scope.onLogin = function($event){
            $event.preventDefault();
            if ($scope.validator.validateAll()) {
                $http({
                    method: 'POST',
                    url: 'http://kai-solutions.com/api/v1/profile/login/',
                    data: {
                        email: $scope.email,
                        password: $scope.password
                    }
                }).then(function(response){
                  var token = response.data.data.token;
                  var profileId = response.data.data.profile_id;
                  $rootScope.token = token;
                  $rootScope.profileId = profileId;
                  $http.defaults.headers.common.Authorization = token;
                  store.setItem('token', $rootScope.token)
                  store.setItem('profileId', $rootScope.profileId)
                  console.log('Token after login is ', token);
                  $location.path('/');
                }).catch(function(err){
                  $scope.loginError = 'Incorrect username or password';
                });
            } else {
              console.log($scope.validator.items)
              for (var i in $scope.validator.items) {
                var item = $scope.validator.items[i];
                if (item.errorText) {
                  $scope.loginError = item.errorText;
                  break;
                }
              }
            }
        };
    }

})();
