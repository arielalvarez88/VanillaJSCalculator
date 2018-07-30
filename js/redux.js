"use strict";
/**
 * Simple implementation of Redux.
 * Read more about Redux : https://redux.js.org/
 */
var Redux = {
    createStore: function (reducer) {

        var state;
        var listeners = [];

        var store = {

            dispatch: function (action) {

                state = reducer(state, action)

                listeners.forEach(function (listener) {
                    listener();
                })
            },

            getState: function () {
                return state;
            },

            subscribe: function (subscriber) {
                listeners.push(subscriber);

                return function () {
                    listeners = listeners.filter(function (listener) {
                        listener !== subscriber;
                    })
                }
            }


        }
        store.dispatch({ type: 'Init state' }); // Init store's state by dispatching initial action.
        return store;
    }
}