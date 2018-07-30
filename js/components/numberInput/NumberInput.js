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

NumberInput.prototype.onInput = function (ev) {
    var newVal = ev.target.value === '' ? null : Number(ev.target.value);
    Store.dispatch({ type: Actions.UPDATE_INPUT_VAL, keyInStore: this.keyInStore, value: newVal });
}



NumberInput.prototype.onKeyPress = function (ev) {
    var validInput = ev.key.search(/[\d\.]/) >= 0,
        isNumberPuntuation = ev.key.search(/\./) >= 0,
        isPointAndAlreadyHadPoint = (this.input.value !== "" && this.input.value.contains(".")) && isNumberPuntuation;

    if (!validInput || isPointAndAlreadyHadPoint) {
        ev.preventDefault();

    }

}



NumberInput.prototype.attachListenersToEvents = function (nodes) {
    Input.prototype.attachListenersToEvents.call(this, nodes);
    this.input.onkeypress = this.onKeyPress.bind(this);
    this.input.oninput = this.onInput.bind(this);
}

