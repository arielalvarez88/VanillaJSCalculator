"use strict";
/**
 * This class provides an input component that communicates with the store and
 * provides styling.
 * 
 *      
 * @typedef {{keyInStore: string, readOnly: boolean}} InputConfig
 * @class Input
 * @param {InputConfig} config 
 * @param {string} config.keyInStore The field in the store to update when this input changes.
 * @param {boolean} config.readOnly
 *
 */
var Input = function (config) {

    this.valueFromStore = config.valueFromStore || false;
    /**
     * @property 
     */
    this.state = {
        value: Store.getState()[config.keyInStore].value,
        errorCls: Store.getState()[config.keyInStore].hasError ? "error" : "",
        readOnly: config.readOnly ? "readonly" : ""
    };

    /**
     * Reference to the HTMLElement of type input in this component.
     */
    this.input = null;

    AbstractComponent.call(this, config); //Call parent class constructor





}

Input.prototype = Object.create(AbstractComponent.prototype);

/**
 * @override
 */
Input.prototype.update = function () {

    if (!this.el) {
        return;
    }
    var state = Store.getState(),
        input = this.el.getElementsByTagName("input")[0],
        inputContainer = this.el;
    this.state = {
        value: state[this.keyInStore].value,
        errorCls: state[this.keyInStore].hasError ? "error" : ""
    }
    if (this.valueFromStore) {
        input.value = this.state.value;
    }

    if (this.state.errorCls === "") {
        inputContainer.className = inputContainer.className.replace("error", "");
    } else if (!inputContainer.className.contains("error")) {
        inputContainer.className = inputContainer.className + " error";
    }



}


/**
 * @override
 */
Input.prototype.getTemplateUrl = function () {
    return "/js/components/input/input.html";
}


/**
 * Send value of the input to the store when you type something.
 * @param {Event} ev
 * 
 */
Input.prototype.onInput = function (ev) {
    Store.dispatch({ type: Actions.UPDATE_INPUT_VAL, keyInStore: this.keyInStore, value: ev.target.value });

}

/**
 * Add class focus to the component's root element, to put a border and a shadow when input is focused.
 * @param {Event} ev
 * 
 */
Input.prototype.onFocus = function (ev) {
    this.el.className = this.el.className + " focus";
}

/**
 * Remove class focus from the componen'ts root element to put remove border and shadow when input is blurred.
 * @param {Event} ev
 * 
 */
Input.prototype.onBlur = function (ev) {

    this.el.className = this.el.className.replace(" focus", "");
}

/**
 * @override
 */
Input.prototype.attachListenersToEvents = function (nodes) {
    this.input = nodes.getElementsByTagName("input")[0];
    this.input.oninput = this.onInput.bind(this);
    this.input.onfocus = this.onFocus.bind(this);
    this.input.onblur = this.onBlur.bind(this);

}
