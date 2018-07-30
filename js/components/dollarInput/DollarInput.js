"use strict";
/**
 * @class DollarInput
 * @param {InputConfig} config 
 */
var DollarInput = function (config) {

    AbstractComponent.call(this, config); //Call parent class constructor

}



DollarInput.prototype = Object.create(NumberInput.prototype);


/**
 * @override
 */
DollarInput.prototype.getTemplateUrl = function () {
    return "/js/components/dollarInput/dollarInput.html";
}

