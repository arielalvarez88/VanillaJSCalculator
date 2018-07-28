"use-strict";
var calcReducer = function (state, action) {
    var defaultState = {
        rateOfIntrest: 0.1,
        yearsOfMortgage: 10,
        loanAmount: null,
        anualTax: null,
        anualInsurance: null,
        principleAndInterest: null,
        tax: null,
        insurance: null,
        totalMontlyPayment: null,
        showingResults: false
    };
    state = state === undefined ? defaultState : state;
    switch (action.type) {
        case Actions.UPDATE_INPUT_VAL:
            var valsToChange = {};
            valsToChange[action.keyInStore] = action.value;
            var newState = ObjectUtils.assign({}, state);
            ObjectUtils.assign(newState, valsToChange);
            return newState;
            break;
        default:
            return state;
    }
}