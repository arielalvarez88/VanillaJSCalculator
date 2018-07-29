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

NumberInput.prototype.attachListenersToEvents = function (nodes) {
    Input.prototype.attachListenersToEvents.call(this, nodes);
    var input = nodes.getElementsByTagName("input")[0];
    input.oninput = this.onInput.bind(this);
}
