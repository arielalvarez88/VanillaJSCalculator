"use strict";

var DollarInput = function (config) {

    AbstractComponent.call(this, config); //Call parent class constructor
    
}



DollarInput.prototype = Object.create(NumberInput.prototype);



DollarInput.prototype.getTemplateUrl = function () {
    return "/js/components/dollarInput/dollarInput.html";
}

