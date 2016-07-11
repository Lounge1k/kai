(function() {
  'use strict';

  angular
    .module('kai')
    .factory('storage', storage);


    var instanceStore = {};

    function storage() {

        function getStore(prefix){
            var _prefix = 'KAI_' + (prefix ? prefix : 'common') + '_';
            if (!instanceStore[_prefix]) {
                instanceStore[_prefix] = new Store(_prefix);
            }

            return instanceStore[_prefix];
        }

        function Store(prefix){
            this.prefix = prefix;
        }

        Store.prototype.setItem = function(key, value){
            localStorage.setItem(this.prefix + key, angular.toJson(value));
        };

        Store.prototype.getItem = function(key){
            var value = localStorage.getItem(this.prefix + key);
            try{
                var parsedValue = angular.fromJson(value);
            } catch(err) {
                parsedValue = value;
            }
            return parsedValue;
        };

        Store.prototype.removeItem = function(key){
            localStorage.removeItem(this.prefix + key);
        };

        return {
            getStore: getStore
        };
    }
})();
