"use strict";
/** 
 * Input that accepts only numeric values and the "." char.
 * @class NumberInput
 * @param {InputConfig} config 
 */
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
/**
 * Cast value to Number before sending it to store.
 * @param {Event} ev 
 */
NumberInput.prototype.onInput = function (ev) {
    var newVal = ev.target.value === '' ? null : Number(ev.target.value);
    Store.dispatch({ type: Actions.UPDATE_INPUT_VAL, keyInStore: this.keyInStore, value: newVal });
}


/**
 * Validates that only valid chars are entered and avoid the "." char twice.
 * @param {Event} ev 
 */
NumberInput.prototype.onKeyPress = function (ev) {
    var validInput = ev.key.search(/[\d\.]/) >= 0,
        isNumberPuntuation = ev.key.search(/\./) >= 0,
        isPointAndAlreadyHadPoint = (this.input.value !== "" && this.input.value.contains(".")) && isNumberPuntuation;

    if (!validInput || isPointAndAlreadyHadPoint) {
        ev.preventDefault();

    }

}



/**
 * 
 * @override
 */
NumberInput.prototype.attachListenersToEvents = function (nodes) {
    Input.prototype.attachListenersToEvents.call(this, nodes);
    this.input.onkeypress = this.onKeyPress.bind(this);
    this.input.oninput = this.onInput.bind(this);
}

