"use strict";

/**
 * 
 * @param {Object} config
 * @param {Number} config.minVal 
 * @param {Number} config.maxVal
 * @param {Number} config.step 
 * 
 */
var Slider = function (config) {
    var me = this,
        validConfig = "minVal" in config && "maxVal" in config && "parentId" in config;

    if (!validConfig) {
        throw new Error("Invalid configuration for Slider.")
    }
    /**
    * @property 
    */
    this.state = ObjectUtils.assign({
        minVal: 0,
        maxVal: 40,
        step: 1,
        value: Store.getState()[config.keyInStore].value
    }, config);

    AbstractComponent.call(this, config); //Call parent class constructor
}



Slider.prototype = Object.create(AbstractComponent.prototype);

Slider.prototype.updateBasedOnState = function () {

    if (!this.el) {
        return;
    }
    var state = Store.getState(),
        digitalValue = this.el.getElementsByClassName("digital-value")[0];

    this.value = state[this.keyInStore];
    digitalValue.getElementsByTagName("input")[0].value = this.value;

}

Slider.prototype.getTemplateUrl = function () {
    return "/js/components/slider/slider.html";
}

Slider.prototype.onInput = function (ev) {

    Store.dispatch({ type: Actions.UPDATE_INPUT_VAL, keyInStore: this.keyInStore, value: Number(ev.target.value) })
}
Slider.prototype.attachListenersToEvents = function (nodes) {
    var input = nodes.getElementsByClassName("range-input");
    if (BrowserUtils.isIE()) {
        input[0].onchange = this.onInput.bind(this);
    } else {
        input[0].oninput = this.onInput.bind(this);
    }


}

Slider.prototype.render = function () {
    AbstractComponent.prototype.render.call(this);
    var rangeInput = this.el.getElementsByClassName('range-input')[0];

    document.documentElement.classList.add('js');

    rangeInput.addEventListener('input', function (e) {
        rangeInput.style.setProperty('--val', + rangeInput.value)
    }, false);
}
/**
 * 
 * Create children components in this method.
 * @template
 * 
 */
Slider.prototype.createChildren = function () {
    var inputContainers = this.el.getElementsByClassName("input-container");

    for (var i = 0; i < inputContainers.length; i++) {
        new Input({
            keyInStore: this.keyInStore,
            parent: inputContainers[i]
        })
    }

}

