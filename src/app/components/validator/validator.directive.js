(function() {
  'use strict';

  angular
    .module('kai')
    .directive('validate', validate);

    function validate($parse){
        var currentId = 0;
        return function(scope, element, attrs){
            var _val = attrs.iValidate ? attrs.iValidate : 'id' + (++currentId);

            function validate(){
                if (!jQuery.contains(document, scope.validator.items[_val].element)) {
                    _.defer(function(){
                        delete scope.validator.items[_val];
                    });
                    return true;
                }

                scope.validator.items[_val].isValid = true;
                scope.validator.items[_val].errorText = '';

                var elementValue = element.val().trim();

                if('match' in scope.validator.items[_val]){
                    if(elementValue != scope.validator.items[attrs.match].value){
                        scope.validator.items[_val].isValid = false;
                        scope.validator.items[_val].errorText = scope.validator.items[_val].match.message;
                    }
                }

                if('regexp' in scope.validator.items[_val]){
                    if(!scope.validator.items[_val].regexp.pattern.test(elementValue)){
                        scope.validator.items[_val].isValid = false;
                        scope.validator.items[_val].errorText = scope.validator.items[_val].regexp.message;
                    }
                }

                if('minLength' in scope.validator.items[_val]){
                    if(elementValue.length < scope.validator.items[_val].minLength.length){
                        scope.validator.items[_val].isValid = false;
                        scope.validator.items[_val].errorText = scope.validator.items[_val].minLength.message;
                    }
                }

                if('maxLength' in scope.validator.items[_val]){
                    if(elementValue.length > scope.validator.items[_val].maxLength.length){
                        scope.validator.items[_val].isValid = false;
                        scope.validator.items[_val].errorText = scope.validator.items[_val].maxLength.message;
                    }
                }

                if('requiredField' in scope.validator.items[_val]){
                    var parser = $parse(scope.validator.items[_val].requiredField.field);
                    if(!parser(scope)){
                        scope.validator.items[_val].isValid = false;
                        scope.validator.items[_val].errorText = scope.validator.items[_val].requiredField.message;
                    }
                }

                if('required' in scope.validator.items[_val]){
                    if(elementValue === ''){
                        var condition = scope.validator.items[_val].required.condition;
                        if (!condition || +scope[condition]){
                            scope.validator.items[_val].isValid = false;
                            scope.validator.items[_val].errorText = scope.validator.items[_val].required.message;
                        }
                    }
                }

                if(scope.validator.items[_val].isValid){
                    element.removeClass('red-border');
                    element.parent().find('.invalid-label[for=' + _val + ']').hide();
                }
                else{
                    element.addClass('red-border');
                    element.parent().find('.invalid-label[for=' + _val + ']').text(scope.validator.items[_val].errorText).show();
                }

                return scope.validator.items[_val].isValid;
            }

            if(!scope.validator) scope.validator = {
                validate: function(_set){
                    var isValidAll = true;
                    for(var i = 0; i < _set.length; ++i){
                        if(!scope.validator.items[_set[i]].validate()) isValidAll = false;
                    }
                    return isValidAll;
                },
                validateAll: function(){
                    var isValidAll = true;
                    for(var key in scope.validator.items){
                        if(!scope.validator.items[key].validate()) isValidAll = false;
                    }
                    return isValidAll;
                },
                items: { }
            };

            if (scope.$parent && !scope.$parent.repeatValidator) {
                scope.$parent.repeatValidator = {};
            }

            if (scope.$parent.repeatValidator && !scope.$parent.repeatValidator[scope.$id]) {
                scope.$parent.repeatValidator[scope.$id] = scope.validator;
            }

            scope.validator.items[_val] = {
                isValid: true,
                validate: validate,
                value: element.val(),
                element: element[0],
                remove: function(){
                    delete scope.validator.items[_val];
                }
            };

            element.data('validator', scope.validator.items[_val]);

            if('required' in attrs){
                scope.validator.items[_val].required = {
                    condition: attrs.required,
                    message: 'This field is required'
                }
            }

            if('requiredField' in attrs){
                scope.validator.items[_val].requiredField = {
                    field: attrs.requiredField,
                    message: attrs.requiredMessage
                };
            }

            if('regexp' in attrs){
                scope.validator.items[_val].regexp = {
                    pattern: new RegExp(attrs.regexp),
                    message: attrs.regexpMsg
                }
            }

            if('match' in attrs && 'matchMsg' in attrs){
                scope.validator.items[_val].match = {
                    message: attrs.matchMsg,
                    dependent: attrs.match
                }
            }

            if('minLength' in attrs){
                scope.validator.items[_val].minLength = {
                    message: 'Minimum length of this field is ' + attrs.minLength,
                    length: attrs.minLength
                }
            }

            if('maxLength' in attrs){
                scope.validator.items[_val].maxLength = {
                    message: 'Maximum length of this field is ' + attrs.maxLength,
                    length: attrs.maxLength
                }
            }

            if (!('noMessage' in attrs)) {
                element.after('<span class="invalid-label" for="' + _val + '"></span>');
            }
        }
    }

  })();
