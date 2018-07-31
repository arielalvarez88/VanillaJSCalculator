"use strict";
/**
 * The Calculator widget. Control the events of calculator.
 * @class Calculator
 * @param {Object} config 
 */
var Calculator = function (config) {

    AbstractComponent.call(this, config); //Call parent class constructor


}

Calculator.prototype = Object.create(AbstractComponent.prototype);


/**
 * @override
 */
Calculator.prototype.mapStateToProps = function () {
    var storeState = Store.getState(),
        generateErrorHtml = function (/**@param {String[]} errors**/ errors) {
            return errors.reduce(function (acc, errorMsg) {
                return acc + "<p>" + errorMsg + "</p>";
            }, "");
        };

    return {
        "loanAmount": storeState.loanAmount.value,
        "anualTax": storeState.anualTax.value,
        "anualInsurance": storeState.anualInsurance.value,
        "loanAmountHasError": storeState.loanAmount.hasError,
        "anualTaxHasError": storeState.anualTax.hasError,
        "anualInsuranceHasError": storeState.anualInsurance.hasError,
        "loanAmountErrors": generateErrorHtml(storeState.loanAmount.errors),
        "anualTaxErrors": generateErrorHtml(storeState.anualTax.errors),
        "anualInsuranceErrors": generateErrorHtml(storeState.anualInsurance.errors),
        "buttonText": storeState.firstCalculation ? "Calculate" : "Recalculate",
        "resultsCls": storeState.showingResults ? "expanded" : "collapsed"
    }
}


/**
 * @override
 */
Calculator.prototype.update = function () {
    var oldProps = this.props;
    this.props = this.mapStateToProps();
    if (!this.el) {
        return;
    }

    var resultsContainer = this.el.getElementsByClassName("results-section")[0];
    var state = Store.getState();

    if (!state.firstSubmit && this.propsChanged) {
        this.validate();
    }
    if (state.showingResults) {

        resultsContainer.className = resultsContainer.className.replace("collapsed", "");

        resultsContainer.className = resultsContainer.className.contains("expanded") ? resultsContainer.className : resultsContainer.className + " expanded";
    } else {

        resultsContainer.className = resultsContainer.className.replace("expanded", "");
        resultsContainer.className = resultsContainer.className.contains("collapsed") ? resultsContainer.className : resultsContainer.className + " collapsed";

    }
    this.updateErrors();
    this.updateButtonText(state);

}
/**
 * Change button text to Recalculate after first calculation.
 * @param {Object} state The state from the store.
 */
Calculator.prototype.updateButtonText = function (state) {

    var buttonText = state.firstCalculation ? "Calculate" : "Recalculate",
        button = this.el.querySelector(".submit-button");

    button.innerHTML = this.props.buttonText;


}

/**
 * Show error messages
 */
Calculator.prototype.updateErrors = function () {
    var loanAmountErrorsContainer = this.el.getElementsByClassName("loan-amount-errors")[0],
        anualTaxErrorsContainer = this.el.getElementsByClassName("anual-tax-errors")[0],
        anualInsuranceErrorsContainer = this.el.getElementsByClassName("anual-insurance-errors")[0];

    loanAmountErrorsContainer.setAttribute("visible", this.props.loanAmountHasError);
    anualTaxErrorsContainer.setAttribute("visible", this.props.anualTaxHasError);
    anualInsuranceErrorsContainer.setAttribute("visible", this.props.anualInsuranceHasError);


    loanAmountErrorsContainer.innerHTML = this.props.loanAmountErrors;
    anualTaxErrorsContainer.innerHTML = this.props.anualTaxErrors;
    anualInsuranceErrorsContainer.innerHTML = this.props.anualInsuranceErrors;

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

/**
 * Handle submit of the widget. Run validation first.
 * @param {Event} ev 
 */
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


    this.updateStateErrors(fieldNames, validationResults);
    if (hasErrors) {
        Store.dispatch({ type: Actions.SET_CALC_ERROR });

    } else {
        Store.dispatch({ type: Actions.CLEAR_CALC_ERROR });
    }
    return !hasErrors;

}

/**
 * Update the state in the store with the errors from validation.
 * 
 * @param {String[]} fieldNames
 * @param {Object.<string, String[]>} validationResults Field name to errors
 */
Calculator.prototype.updateStateErrors = function (allFieldNames, validationResults) {
    allFieldNames.forEach(function (fieldName) {
        var fieldHasError = fieldName in validationResults;

        if (fieldHasError) {
            Store.dispatch({ type: Actions.SET_INPUT_ERROR, errors: validationResults[fieldName], keyInStore: fieldName });
        } else {
            Store.dispatch({ type: Actions.CLEAR_INPUT_ERROR, keyInStore: fieldName });
        }

    });
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

