"use-strict";
var calcReducer = function(state, action){
    var defaultState = {
        rateOfIntrest: 0,
        yearsOfMortgage: 10,
        loanAmount: null,
        annualTax : null,
        annualInssurance: null,
        principleAndInterest: null,
        tax: null,
        insurance: null,
        totalMontlyPayment: null
    }
    state = state === undefined ?  defaultState : state
    switch(action.type){
        case Actions.UPDATE_INPUT_VAL:
            var valsToChange = {};
            valsToChange[action.keyInStore] = action.value
            var newState = Object.assign({}, state)
            Object.assign(newState, valsToChange)
            return newState
        break;
        default:
            return state
    }    
}