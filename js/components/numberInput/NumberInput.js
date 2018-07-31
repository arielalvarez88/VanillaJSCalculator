"use strict";
/** 
 * Input that accepts only numeric values and the "." char.
 * @class NumberInput
 * @param {Object} config
 * @param {string} config.keyInStore The field in the store to update when this input changes.
 * @param {boolean} config.readOnly
 * @param {min} config.min
 * 
 **/

var NumberInput = function (config) {

    this.state = {
        min: typeof config.min === "number" ? config.min : ""
    };
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
    var newVal = ev.target.value === "" ? null : Number(ev.target.value);
    Store.dispatch({ type: Actions.UPDATE_INPUT_VAL, keyInStore: this.keyInStore, value: newVal });
}


/**
 * 
 * @override
 */
NumberInput.prototype.attachListenersToEvents = function (nodes) {
    Input.prototype.attachListenersToEvents.call(this, nodes);
    this.input.oninput = this.onInput.bind(this);
}

