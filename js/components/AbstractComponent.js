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
    * Html template used for initial render.
    * @property {String}
    */
    this.parent = null;

    /**
    * State of the component.
    * @property {String}
    */
    this.parent = null;

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
    Store.subscribe(this.updateBasedOnState.bind(this));


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
    html = html.format(this.getState());
    parent.innerHTML = html;
    this.el = parent.firstChild
    this.attachListenersToEvents(this.el);
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
