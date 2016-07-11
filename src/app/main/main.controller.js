(function() {
  'use strict';

  angular
    .module('kai')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $log, $location, kaiService, storage) {
    // var vm = this;

    var store = storage.getStore('common');
    var token = store.getItem('clientToken');
    console.log('Last path is ', store.getItem('lastPath'));
    console.log('Token is ', token);
    if (!token) {
        store.setItem('lastPath', $location.path());
        console.log('Redirect to login')
        // $location.path('/login');
        // return;
    }

    kaiService.getCompanies().then(function(data){
      $log.debug('Companies', data);
    });
  }
})();
