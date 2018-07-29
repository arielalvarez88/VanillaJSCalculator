"use-strict";
var calcReducer = function (state, action) {
    var defaultState = {
        rateOfIntrest: {
            value: 0.1,
            hasError: false
        },
        yearsOfMortgage: {
            value: 10,
            hasError: false
        },
        loanAmount: {
            value: null,
            hasError: false
        },
        anualTax: {
            value: null,
            hasError: false
        },
        anualInsurance: {
            value: null,
            hasError: false
        },
        principleAndInterest: null,
        tax: null,
        insurance: null,
        totalMontlyPayment: null,
        showingResults: false,
        calcInError: false,
        firstSubmit: true
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
        case Actions.CALC_SUBMIT:
            var valsToChange = {
                firstSubmit: false
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
                hasError: state[action.keyInStore].hasError
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
                hasError: false
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