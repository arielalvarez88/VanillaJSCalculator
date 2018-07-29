/**
 * Validation for a required value
 * 
 * @class  
 */
var RequiredValidationRule = function(){};

RequiredValidationRule.prototype = Object.create(ValidationRule.prototype);
/**
 * Returns an list of error messages the value doesn't pass validation.
 * @param {any} value
 * @return {String[]} 
 */
RequiredValidationRule.validate = function(value){
    if(value !== '' && value !== null){
        return [];
    }else{
        return ['This field is required'];   
    }
    

};