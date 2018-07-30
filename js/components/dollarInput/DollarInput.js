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


DollarInput.prototype.onKeyPress = function (ev) {
    var isNumber = ev.key.search(/\d/) >= 0,
        isNumberPuntuation = ev.key.search(/\./) >= 0;

    if (!isNumber && !isNumberPuntuation) {
        ev.preventDefault();

    }

}

DollarInput.prototype.onFocus = function (ev) {
    Input.prototype.onFocus.apply(this, arguments);
    this.avoidCaretBeforeDollar();


}

DollarInput.prototype.avoidCaretBeforeDollar = function () {
    var caretPostionBeforeDollar
    if (caretPostionBeforeDollar) {
        DomUtils.setCaretAt(this.input, 1);
    }

}


DollarInput.prototype.attachListenersToEvents = function (nodes) {
    NumberInput.prototype.attachListenersToEvents.call(this, nodes);

    
    this.input.onfocus = this.onFocus.bind(this);
    this.input.onclick = this.avoidCaretBeforeDollar.bind(this);
    this.input.onkeypress = this.avoidCaretBeforeDollar.bind(this);

}
