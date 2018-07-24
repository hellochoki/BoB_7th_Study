(function() {
  'use strict';

  angular
    .module('scg')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
