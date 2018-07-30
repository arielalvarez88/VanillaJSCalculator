"use-strict";
var calcReducer = function (state, action) {
    var defaultState = {
        rateOfIntrest: {
            value: 0.1,
            hasError: false,
            errors: []
        },
        yearsOfMortgage: {
            value: 10,
            hasError: false,
            errors: []
        },
        loanAmount: {
            value: null,
            hasError: false,
            errors: []
        },
        anualTax: {
            value: null,
            hasError: false,
            errors: []
        },
        anualInsurance: {
            value: null,
            hasError: false,
            errors: []
        },
        principleAndInterests: null,
        tax: null,
        insurance: null,
        totalMonthlyPayment: null,
        showingResults: false,
        calcInError: false,
        firstSubmit: true,
        firstCalculation: true
    }, getNewState = function (state, valsToChange) {
        var newState = ObjectUtils.assign({}, state);
        ObjectUtils.assign(newState, valsToChange);
        return newState;
    };
    state = state === undefined ? defaultState : state;

    switch (action.type) {
        case Actions.CALC_SUBMIT:
            var valsToChange = {
                firstSubmit: false
            };
            return getNewState(state, valsToChange);
        case Actions.CALCULATE:
            var interestRate = state.rateOfIntrest.value,
                loanAmount = state.loanAmount.value,
                annualTax = state.anualInsurance.value,
                yearsOfMortgage = state.yearsOfMortgage.value,
                anualInsurance = state.anualInsurance.value,
                principleAndInterests = ((interestRate / 100) / 12) * loanAmount / (1 - Math.pow((1 + ((interestRate / 100) / 12)), - yearsOfMortgage * 12)),
                tax = annualTax / 12,
                insurance = anualInsurance / 12,
                totalMonthlyPayment = principleAndInterests + tax + insurance,
                valsToChange = {
                    showingResults: true,
                    firstCalculation: false,
                    principleAndInterests: principleAndInterests.toFixed(2),
                    tax: tax.toFixed(2),
                    insurance: insurance.toFixed(2),
                    totalMonthlyPayment: totalMonthlyPayment.toFixed(2)
                };
            return getNewState(state, valsToChange);
        case Actions.SET_CALC_ERROR:
            var valsToChange = {
                calcInError: true
            };
            return getNewState(state, valsToChange);
        case Actions.CLEAR_CALC_ERROR:
            var valsToChange = {
                calcInError: false
            };
            return getNewState(state, valsToChange);
        case Actions.UPDATE_INPUT_VAL:
            var valsToChange = {};
            valsToChange[action.keyInStore] = {
                value: action.value,
                hasError: state[action.keyInStore].hasError,
                errors: state[action.keyInStore].errors
            }
            return getNewState(state, valsToChange);
        case Actions.SET_INPUT_ERROR:
            var valsToChange = {};
            valsToChange[action.keyInStore] = {
                value: state[action.keyInStore].value,
                hasError: true,
                errors: action.errors
            }
            return getNewState(state, valsToChange);
        case Actions.CLEAR_INPUT_ERROR:
            var valsToChange = {};
            valsToChange[action.keyInStore] = {
                value: state[action.keyInStore].value,
                hasError: false,
                errors: []
            }
            return getNewState(state, valsToChange);
        case Actions.CALCULATE:
            var valsToChange = {
                showingResults: true
            };
            return getNewState(state, valsToChange);
        default:
            return state;
    }
}