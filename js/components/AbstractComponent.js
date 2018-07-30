
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
    * Key in the state of the Store to save the value of this component.
    * @property {String}
    */
    this.keyInStore = config.keyInStore;

    HttpUtils.getFileContent(this.getTemplateUrl(), function (content) {
        me.template = content.trim();
        me.render();
    })
    this.props = this.mapStateToProps();

    Store.subscribe(this.updateBasedOnState.bind(this));


}
/**
 * Create a props to state map.
 * @template
 */
AbstractComponent.prototype.mapStateToProps = function () { return {};}

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
AbstractComponent.prototype.updateBasedOnState = function () { }

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
 * This method is meant to be overwritten in child classes.
 * @template
 */
AbstractComponent.prototype.attachListenersToEvents = function () {
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