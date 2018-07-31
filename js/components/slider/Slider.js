"use strict";

/**
 * Component to select a value in a range input. Shows the value in a normal input..
 * @class Slider
 * @param {Object} config
 * @param {Number} config.minVal 
 * @param {Number} config.maxVal
 * @param {Number} config.step
 * @param {String} config.keyInStore
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

/**
 * @override
 */
Slider.prototype.update = function () {

    if (!this.el) {
        return;
    }
    var state = Store.getState(),
        digitalValue = this.el.getElementsByClassName("digital-value")[0];

    this.value = state[this.keyInStore];
    digitalValue.getElementsByTagName("input")[0].value = this.value;

}
/**
 * @override
 */
Slider.prototype.getTemplateUrl = function () {
    return "/js/components/slider/slider.html";
}
/**
 * Dispatch value from slider to store.
 */
Slider.prototype.onInput = function (ev) {

    Store.dispatch({ type: Actions.UPDATE_INPUT_VAL, keyInStore: this.keyInStore, value: Number(ev.target.value) })
}
/**
 *@override
 */
Slider.prototype.attachListenersToEvents = function (rootElement) {
    var input = rootElement.getElementsByClassName("range-input");
    if (BrowserUtils.isIE()) {
        input[0].onchange = this.onInput.bind(this);
    } else {
        input[0].oninput = this.onInput.bind(this);
    }

    this.listenToSliderDrag(rootElement);


}

/**
 * Updates the style of the input based on the value to achieve the progress style in webkit.
 * 
 * @param {HTMLElement} rootElement
 */
Slider.prototype.listenToSliderDrag = function (rootElement) {
    var rangeInput = rootElement.getElementsByClassName('range-input')[0];

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
        new NumberInput({
            keyInStore: this.keyInStore,
            parent: inputContainers[i],
            valueFromStore: true,
            readOnly: true
        });
    }

}

