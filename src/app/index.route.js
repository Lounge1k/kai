(function() {
  'use strict';

  angular
    .module('kai')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/components/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'app/components/login/login.html',
        controller: 'LogoutController',
        controllerAs: 'vm'
      })
      .state('changePassword', {
        url: '/change-password',
        templateUrl: 'app/components/change-pass/change-pass.html',
        controller: 'ChangePassController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/main');
  }

})();
