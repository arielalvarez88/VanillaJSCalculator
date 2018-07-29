"use strict";

var Input = function (config) {

    AbstractComponent.call(this, config); //Call parent class constructor
    /**
     * @property 
     */
    this.state = {
        value: Store.getState()[this.keyInStore].value,
        errorCls: Store.getState()[this.keyInStore].hasError ? "error" : ""
    };


}

Input.prototype = Object.create(AbstractComponent.prototype);

Input.prototype.updateBasedOnState = function () {

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
    input.value = this.state.value;
    if (this.state.errorCls === '') {
        inputContainer.className = inputContainer.className.replace("error", "");
    } else if (!inputContainer.className.contains("error")) {
        inputContainer.className = inputContainer.className + " error";
    }



}

Input.prototype.getTemplateUrl = function () {
    return "/js/components/input/input.html";
}

Input.prototype.onInput = function (ev) {
    Store.dispatch({ type: Actions.UPDATE_INPUT_VAL, keyInStore: this.keyInStore, value: ev.target.value});
}


Input.prototype.onFocus = function (ev) {
    this.el.className = this.el.className + " focus";
}

Input.prototype.onBlur = function (ev) {

    this.el.className = this.el.className.replace(" focus", "");
}

Input.prototype.attachListenersToEvents = function (nodes) {
    this.input = nodes.getElementsByTagName("input")[0];
    this.input.oninput = this.onInput.bind(this);
    this.input.onfocus = this.onFocus.bind(this);
    this.input.onblur = this.onBlur.bind(this);

}
