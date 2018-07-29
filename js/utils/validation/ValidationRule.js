/**
 * Abstract class to define interface for classes used to validate an value..
 * @abstract
 * @class  
 */
var ValidationRule = function(){};


/**
 * Returns an list of error messages the value doesn't pass validation.
 * @param {any} value
 * @return {String[]} 
 */
ValidationRule.validate = function(value){return []};