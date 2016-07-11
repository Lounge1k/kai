(function() {
  'use strict';

  describe('controllers', function(){

    beforeEach(module('kai'));
    beforeEach(inject(function(_$controller_, _rwsService_) {
      spyOn(_rwsService_, 'getScenarios').and.returnValue([{}, {}, {}, {}, {}]);
    }));
  });
})();
