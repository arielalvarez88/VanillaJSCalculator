/**
 * Validation for a required value
 * 
 * @class  
 */
var ValidNumberInput = function(){};

ValidNumberInput.prototype = Object.create(ValidationRule.prototype);
/**
 * Returns an list of error messages the value doesn't pass validation.
 * @param {any} value
 * @param {Object} extraInfo
 * @return {String[]} 
 * 
 */
ValidNumberInput.validate = function(value, extraInfo){
    var input = extraInfo.input,
        isValid = input.checkValidity();
        
    if(isValid && !isNaN(value)){
        return [];
    }else if(typeof value === 'number' && value < 0){
        return ["Only positive numbers."];   
    }else{
        return ["Invalid number."];
    }
    

};