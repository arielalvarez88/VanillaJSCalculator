var BrowserUtils = function(){

}

BrowserUtils.isIE = function(){
    var isIE = /*@cc_on!@*/false || !!document.documentMode, // Internet Explorer 6-11
    isEdge = !isIE && !!window.StyleMedia; // Edge 20+
 
    return isIE
}
