"use strict";

var Input = function (config) {

    AbstractComponent.call(this, config); //Call parent class constructor
    /**
     * @property 
     */
    this.state = {
        value: Store.getState()[this.keyInStore]
    };


}

Input.prototype = Object.create(AbstractComponent.prototype);

Input.prototype.updateBasedOnState = function () {

    if (!this.el) {
        return;
    }
    var state = Store.getState(),
        input = this.el.getElementsByTagName("input")[0];

    this.value = state[this.keyInStore]
    input.value = this.value;

}

Input.prototype.getTemplateUrl = function () {
    return "/js/components/input/input.html";
}

Input.prototype.onChange = function (ev) {

    Store.dispatch({ type: Actions.UPDATE_INPUT_VAL, keyInStore: this.keyInStore, value: Number(ev.target.value) })
}


Input.prototype.onFocus = function (ev) { 
    this.el.className = this.el.className + " focus";
}

Input.prototype.onBlur = function (ev) { 
    
    this.el.className = this.el.className.replace(" focus","");
}

Input.prototype.attachListenersToEvents = function (nodes) {
    this.input = nodes.getElementsByTagName("input")[0];    
    this.input.onchange = this.onChange.bind(this);
    this.input.onfocus = this.onFocus.bind(this);
    this.input.onblur = this.onBlur.bind(this);
    
}
