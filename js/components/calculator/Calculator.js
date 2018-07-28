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
    var resultsContainer = this.el.getElementsByClassName("results-container")[0];
    var state = Store.getState();

    if (state.showingResults) {

        resultsContainer.className = this.el.className.replace("collapsed", "");
        resultsContainer.className = this.el.className + " expanded";
    } else {

        resultsContainer.className = this.el.className.replace("expanded", "");
        resultsContainer.className = this.el.className + " collapsed";

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
    if (!this.el) {
        throw new Error("To attach listeners, the component must be rendered");
    }

    var form = this.el.getElementsByTagName("form")[0];
    form.onsubmit = function (ev) {
        ev.preventDefault();
        Store.dispatch({ type: Actions.CALCULATE });
    };
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

    new Slider({
        minVal: 0.1,
        maxVal: 10,
        step: 0.1,
        keyInStore: "rateOfIntrest",
        parentId: "rate-of-interest"
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


    var resultsContainer = this.el.getElementsByClassName('results-section')[0];
    new Results({
        parent: resultsContainer
    })

}

