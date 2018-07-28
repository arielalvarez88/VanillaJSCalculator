"use strict";

var DollarInput = function (config) {

    AbstractComponent.call(this, config); //Call parent class constructor
    /**
     * @property 
     */
    this.state = {
        value: Store.getState()[this.keyInStore]
    };


}

DollarInput.prototype = Object.create(NumberInput.prototype);



DollarInput.prototype.getTemplateUrl = function () {
    return "/js/components/dollarInput/dollarInput.html";
}


DollarInput.prototype.attachListenersToEvents = function (nodes) {
    NumberInput.prototype.attachListenersToEvents.call(this,nodes);
    var input = nodes.getElementsByTagName("input")[0];
}
