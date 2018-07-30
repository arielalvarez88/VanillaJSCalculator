"use strict";
/**
 * Widget to show results of calculation to user.
 * @param {Object} config 
 */
var Results = function (config) {

    AbstractComponent.call(this, config); //Call parent class constructor


}

Results.prototype = Object.create(AbstractComponent.prototype);

/**
 * @override
 */
Results.prototype.mapStateToProps = function () {
    var storeState = Store.getState();
    return {
        firstCalculation: storeState.firstCalculation,
        notFirstCalculation: !storeState.firstCalculation,
        principleAndInterests: storeState.principleAndInterests,
        tax: storeState.tax,
        insurance: storeState.insurance,
        moneyPlaceholder: "$ - -",
        totalMonthlyPayment: storeState.totalMonthlyPayment
    }
}
/**
 * @override
 */
Results.prototype.update = function () {

    if (!this.el) {
        return;
    }

    this.updateValueFields();
    this.hideOrShowPlaceHolders();


}
/**
 * Hide or show the placeholder that we show before initial calculation.
 */
Results.prototype.hideOrShowPlaceHolders = function () {
    var placeHolders = this.el.getElementsByClassName("money-placeholder");

    for (var i = 0; i < placeHolders.length; i++) {
        placeHolders[i].setAttribute("visible", this.props.firstCalculation);
    }
}
/**
 * Hide or show with the right value the calculated values.
 */
Results.prototype.updateValueFields = function () {
    var allVariableContainers = this.el.getElementsByClassName("detail-value"), container,
        fieldInProps, visibleAttrVal;

    for (var i = 0; i < allVariableContainers.length; i++) {
        container = allVariableContainers[i];
        fieldInProps = container.getAttribute("data-field");
        container.innerHTML = "$" + this.props[fieldInProps];
        visibleAttrVal = this.props.notFirstCalculation;
        container.setAttribute("visible", visibleAttrVal);
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

