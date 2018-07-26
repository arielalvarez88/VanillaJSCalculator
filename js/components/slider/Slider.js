"use strict";

var Slider = function (config) {
    var me = this,
        validConfig = "minVal" in config && "maxVal" in config && "parentId" in config;

    if (!validConfig) {
        throw new Error("Invalid configuration for Slider.")
    }
    AbstractComponent.call(this, config); //Call parent class constructor
    /**
     * @property 
     */
    this.state = Object.assign({
        minVal : 0, 
        maxVal : 100,        
        value: 50
    }, config);

    this.value = Store.getState()[this.keyInStore];


}

Slider.prototype = Object.create(AbstractComponent.prototype);

Slider.prototype.updateBasedOnState = function () {

    if (!this.el) {
        return;
    }
    var state = Store.getState(),
        digitalValue = this.el.getElementsByClassName("digital-value")[0];

    this.value = state[this.keyInStore]
    digitalValue.value = this.value;

}

Slider.prototype.getTemplateUrl = function(){
    return "/js/components/slider/slider.html";
}

Slider.prototype.onInput = function (ev) {

    Store.dispatch({ type: Actions.UPDATE_INPUT_VAL, keyInStore: this.keyInStore, value: Number(ev.target.value) })
}
Slider.prototype.attachListenersToEvents = function (nodes) {
    var input = nodes.getElementsByClassName('range-input');
    input[0].oninput = this.onInput.bind(this);
}
