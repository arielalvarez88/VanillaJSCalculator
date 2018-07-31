
/** 
 * Provides basic functionality to components.
 * @class AbstractComponent
 * @param {Object} config 
 */
var AbstractComponent = function (config) {
    var me = this;
    /**
     * The root element of this component
     * @property {HTMLElement}
     */
    this.el = null;

    /**
     * Html template used for initial render.
     * @property {String}
     */
    this.template = null;

    /**
    * Parent element of this component.
    * @property {HtmlElement}
    */
    this.parent = config.parent || null;

    this.parentId = config.parentId;

    /**
     * True if the propert
     * @property {boolean}
     */
    this.propsChanged = false;

    /**
     * Save references to child components in this property.
     * @property {Object.<string,AbstractComponent>} childComponents
     */
    this.childComponents = {};

    /**
    * Key in the state of the Store to save the value of this component.
    * @property {String}
    */
    this.keyInStore = config.keyInStore;
    this.props = this.mapStateToProps();

    HttpUtils.getFileContent(this.getTemplateUrl(), function (content) {
        me.template = content.trim();
        me.render();
    })

    Store.subscribe(this.onStoreChanged.bind(this));


}

/**
 * Called when the state in the store changes.
 */
AbstractComponent.prototype.onStoreChanged = function () {
    var oldProps = this.props;
    this.props = this.mapStateToProps();
    this.propsChanged = this.didPropsChanged(oldProps, this.props);
    this.update();
    /**
     * TODO: We could avoid modifying DOM too much with this pseudo-code if the app becomes slow. It will require to modify several components though so it changes the props instead of the state.:
     * 
     * var oldProps = this.props,
        newProps = this.mapStateToProps(),
        didPropsChanged = this.didPropsChanged(oldProps, newProps);

    this.props = newProps;
    if (didPropsChanged) {
        this.update();
    }**/

}
/**
 * Create a props to state map.
 * @template
 */
AbstractComponent.prototype.mapStateToProps = function () { return {}; }

/**
 * Does a shallow compare between two objects and return true if they are are equal, false otherwise.
 * @returns {boolean}
 */
AbstractComponent.prototype.didPropsChanged = function (oldProps, newProps) {
    var change = false;
    Object.keys(oldProps).forEach(function (prop) {
        change = change || (oldProps[prop] !== newProps[prop]);
        if (change) {
            return false;
        }

    });

    return change;

}


AbstractComponent.prototype.getState = function () {
    return this.state;
}

/**
 * Update dom based on state.
 * @template 
 */
AbstractComponent.prototype.update = function () { }

/**
 * Return the absolute url of the html template for this component.
 * @template
 * @returns {string}
 */
AbstractComponent.prototype.getTemplateUrl = function () { };

/**
 * Initial render method.
 */
AbstractComponent.prototype.render = function () {
    var parent = this.getParent()
    var html = this.template;
    html = html.format(this.getRenderProps());
    parent.innerHTML = html;
    this.el = parent.firstChild
    this.createChildren();
    this.attachListenersToEvents(this.el);


}


/**
 * This method is meant to be overwritten in child classes.
 * @template
 */
AbstractComponent.prototype.getRenderProps = function () {
    var stateAndProps = ObjectUtils.assign({}, this.getState());
    stateAndProps = ObjectUtils.assign(stateAndProps, this.mapStateToProps());
    return stateAndProps;

}

/**
 * This method is meant to be overwritten in child classes. Use to attach listeners to the 
 * dom nodes after the component is rendered.
 * @template
 * @param {HTMLElement} rootElement
 */
AbstractComponent.prototype.attachListenersToEvents = function (rootElement) {
}

/**
 * 
 * Return the parent HTMLElement in which this component is the embedded.
 * @return HTMLElement
 * 
 */
AbstractComponent.prototype.getParent = function () {
    if (!this.parent) {
        this.parent = document.getElementById(this.parentId);
    }
    return this.parent;
}

/**
 * 
 * Create children components in this method.
 * @template
 * 
 */
AbstractComponent.prototype.createChildren = function () {

}