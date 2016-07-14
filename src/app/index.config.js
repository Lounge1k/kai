(function() {
  'use strict';

  angular
    .module('kai')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // MomentJS locale
    moment.locale('de');

  }

})();
