(function() {
  'use strict';

  angular
    .module('kai')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
