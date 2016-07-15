(function() {
  'use strict';

  angular
    .module('kai')
    .factory('modalService', modal);

    /** @ngInject */
    function modal($rootScope, $location, $sce, storage){

        return {
            confirm: function(params){
                if(!params.func)
                    return;

                $rootScope.overlay = true;
                $rootScope.advancedOverlay = true;

                $rootScope.confirm = {
                    state: true,
                    style: params.width ? {width: params.width + 'px'} : {},
                    text: params.text,
                    func: params.func
                };

                _enterPress($rootScope.confirm.func);
            },
            close: function(){
                $rootScope.overlay = $rootScope.hasOpenedDialog;
                $rootScope.advancedOverlay = false;
                $rootScope.confirm.state = false;
                $(document).off('keypress');
            }
        };

        function _enterPress(func){
            $(document).off('keypress').on('keypress', function(e){
                if(e.keyCode == 13){
                    $rootScope.$apply(func);
                }
            });
        }
    }
})();
