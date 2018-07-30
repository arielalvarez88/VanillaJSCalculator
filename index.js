function dynamicallyLoadScript(url, async) {
    async = async === true ? async : false
    var script = document.createElement("script"); // Make a script DOM node
    script.src = url; // Set it's src to the provided URL
    script.async = async
    document.head.appendChild(script); // Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}

var Store;

var onload = function () {
    /**
     * Initiate app state
     */
    Store = Redux.createStore(calcReducer);
    /**
     * Create inital component.
     */
    new Calculator({
        parentId: 'calculator-container'
    })

}



document.body.onload = onload;



