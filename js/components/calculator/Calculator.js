"use strict";
/**
 * The calculator widget. It contains everything related to the calculator.
 * @param {Object} config 
 */
var Calculator = function (config) {

    AbstractComponent.call(this, config); //Call parent class constructor
    /**
     * @property 
     */
    this.state = {

    };


}

Calculator.prototype = Object.create(AbstractComponent.prototype);

/**
 * @override
 */
Calculator.prototype.updateBasedOnState = function () {

    if (!this.el) {
        return;
    }


}

/**
 * @override
 */
Calculator.prototype.getTemplateUrl = function () {
    return "/js/components/calculator/calculator.html";
}

/**
 * @override
 */
Calculator.prototype.attachListenersToEvents = function (nodes) {

}


/**
 * @override
 */
Calculator.prototype.createChildren = function (nodes) {

    new Slider({
        minVal: 1,
        maxVal: 40,
        keyInStore: 'yearsOfMortgage',
        parentId: "years-of-mortgage"
    })

    new DollarInput({
        keyInStore: 'loanAmount',
        parentId: "loan-amount"
    })


    new DollarInput({
        keyInStore: 'anualTax',
        parentId: 'anual-tax'
    })

    new DollarInput({
        keyInStore: 'anualInsurance',
        parentId: 'anual-insurance'
    })



}

