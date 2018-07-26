var HttpUtils = {
    getFileContent: function (url, callback, errCallback) {
        var httpRequest = new XMLHttpRequest()
        httpRequest.open('GET', url, true);
        httpRequest.send();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
                callback(httpRequest.responseText)
            }

            if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status !== 200) {
                errCallback("Error in the request", httpRequest)
            }
            

        }
    }
}