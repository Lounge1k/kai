(function() {
  'use strict';

  angular
    .module('kai')
    .controller('LoginController', LoginController);

    function LoginController($http, $scope, $location, $rootScope, storage){

        var store = storage.getStore('common');
        var token = store.getItem('token');
        if (token) {
            $rootScope.authorized = true;
        } else {
            $rootScope.authorized = false;
        }

        $rootScope.title = 'Sign in';

        var loginData = store.getItem('loginData');
        if (loginData) {
            $scope.email = loginData.email;
            $scope.password = loginData.password;
        }

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
                    if ($scope.remember) {
                        store.setItem('loginData', {
                            email: $scope.email,
                            password: $scope.password
                        });
                    }

                    store.setItem('token', response.data.token);
                    $location.path('admin/basic-registration');
                }).catch(function(err){
                    if (err.status === 400) {
                        $scope.loginError = err.message;
                    } else {
                        console.error(err);
                    }
                });
            }
        };
    }

})();
