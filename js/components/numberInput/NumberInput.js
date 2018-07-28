"use strict";

var NumberInput = function (config) {

    Input.call(this, config); //Call parent class constructor
  

}

NumberInput.prototype = Object.create(Input.prototype);

/**
 * @override
 */
NumberInput.prototype.getTemplateUrl = function () {
    return "/js/components/numberInput/NumberInput.html";
}

NumberInput.prototype.onKeyPress = function(ev){
    debugger;
}

NumberInput.prototype.attachListenersToEvents = function (nodes) {
    Input.prototype.attachListenersToEvents.call(this,nodes);
    var input = nodes.getElementsByTagName("input")[0];
    input.onkeypress = this.onKeyPress.bind(this);
}
