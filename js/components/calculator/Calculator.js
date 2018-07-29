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
        resultsCls: Store.getState().showingResults ? "expanded" : "collapsed"
    };


}

Calculator.prototype = Object.create(AbstractComponent.prototype);


/**
 * @override
 */
Calculator.prototype.mapStateToProps = function () {
    var storeState = Store.getState();
    return {
        "loanAmount": storeState.loanAmount.value,
        "anualTax": storeState.anualTax.value,
        "anualInsurance": storeState.anualInsurance.value
    }
}


/**
 * @override
 */
Calculator.prototype.updateBasedOnState = function () {
    var oldProps = this.props;
    this.props = this.mapStateToProps();
    if (!this.el) {
        return;
    }

    var resultsContainer = this.el.getElementsByClassName("results-section")[0];
    var state = Store.getState();

    if (!state.firstSubmit && this.didPropsChanged(oldProps, this.props)) {
        this.validate();
    }
    if (state.showingResults) {

        resultsContainer.className = resultsContainer.className.replace("collapsed", "");
        resultsContainer.className = resultsContainer.className + " expanded";
    } else {

        resultsContainer.className = resultsContainer.className.replace("expanded", "");
        resultsContainer.className = resultsContainer.className + " collapsed";

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
    form.onsubmit = this.onSubmit.bind(this);
}

Calculator.prototype.onSubmit = function (ev) {
    ev.preventDefault();
    Store.dispatch({ type: Actions.CALC_SUBMIT });
    var isValid = this.validate();
    if (isValid) {
        Store.dispatch({ type: Actions.CALCULATE });
    }
}

/**
 *
 * Checks fields against some rules and marks and clear errors from the state. Returns true all fields 
 * have valid values. False otherwise.
 * @return {boolean} 
 */
Calculator.prototype.validate = function () {

    var storeState = Store.getState(),
        rules = {
            "loanAmount": [
                {
                    rule: RequiredValidationRule,
                    args: {}
                }
            ]
            ,
            "anualTax": [
                {
                    rule: RequiredValidationRule,
                    args: {}
                }
            ],
            "anualInsurance": [
                {
                    rule: RequiredValidationRule,
                    args: {}
                }
            ]
        }, vals = {
            "loanAmount": storeState.loanAmount.value,
            "anualTax": storeState.anualTax.value,
            "anualInsurance": storeState.anualInsurance.value,
        }, validationResults = ValidationUtils.validate(vals, rules),
        hasErrors = Object.keys(validationResults).length > 0,
        fieldNames = Object.keys(vals);

    this.clearPreviousErrors(fieldNames);
    if (hasErrors) {
        Store.dispatch({ type: Actions.SET_CALC_ERROR });
        this.setFieldErrors(validationResults);
    } else {
        Store.dispatch({ type: Actions.CLEAR_CALC_ERROR });
    }
    return !hasErrors;

}

Calculator.prototype.clearPreviousErrors = function (fieldNames) {
    fieldNames.forEach(function (fieldName) {
        Store.dispatch({ type: Actions.CLEAR_INPUT_ERROR, keyInStore: fieldName });
    })
}
/**
 * 
 * 
 * 
 * @param {Object.<string, String[]>} validationResults Field name to errors
 */
Calculator.prototype.setFieldErrors = function (validationResults) {
    for (var fieldName in validationResults) {
        if (!validationResults.hasOwnProperty(fieldName)) {
            continue;
        }
        Store.dispatch({ type: Actions.SET_INPUT_ERROR, errors: validationResults[fieldName], keyInStore: fieldName });
    }
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

