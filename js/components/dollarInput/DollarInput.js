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

DollarInput.prototype = Object.create(AbstractComponent.prototype);

DollarInput.prototype.updateBasedOnState = function () {

    if (!this.el) {
        return;
    }
    var state = Store.getState(),
        input = this.el.getElementsByTagName("input")[0];

    this.value = state[this.keyInStore]
    input.value = this.value;

}

DollarInput.prototype.getTemplateUrl = function () {
    return "/js/components/dollarInput/dollarInput.html";
}

DollarInput.prototype.onChange = function (ev) {    

    Store.dispatch({ type: Actions.UPDATE_INPUT_VAL, keyInStore: this.keyInStore, value: Number(ev.target.value) })
}
DollarInput.prototype.onKeyUp = function (ev) {    

    ev.target.value = "$ " + ev.target.value;
    
}


DollarInput.prototype.attachListenersToEvents = function (nodes) {
    var input = nodes.getElementsByTagName("input")[0];
    input.onchange = this.onChange.bind(this);
    input.onkeyup = this.onKeyUp.bind(this);
}
