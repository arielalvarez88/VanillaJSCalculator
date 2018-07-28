"use strict";
/**
 * The calculator widget. It contains everything related to the calculator.
 * @param {Object} config 
 */
var Results = function (config) {

    AbstractComponent.call(this, config); //Call parent class constructor
    /**
     * @property 
     */
    this.state = {

    };


}

Results.prototype = Object.create(AbstractComponent.prototype);

/**
 * @override
 */
Results.prototype.updateBasedOnState = function () {

    if (!this.el) {
        return;
    }


}

/**
 * @override
 */
Results.prototype.getTemplateUrl = function () {
    return "/js/components/results/results.html";
}

/**
 * @override
 */
Results.prototype.attachListenersToEvents = function (nodes) {

}


/**
 * @override
 */
Results.prototype.createChildren = function (nodes) {

    
}

