/**
 * Returns true if this string has at least one occurrence of supplied text
 * @param {String} needle The string to look for
 * @return {Boolean}
 */
String.prototype.contains = function (needle) {
    return this === needle || this.indexOf(needle) != -1;
};

/**
 * Matches template strings in this format -> "{var}" with the keys of the param and replaces with the values of the param.
 *  
 * @param {Object.<string,string>} valuesToReplace 
 * @return {String}
 */
String.prototype.format = function (valuesToReplace) {

    var replacements = valuesToReplace,
        str = this;


    return str.replace(/{.+?}/g, function (token) {

        var name = token.replace('{', '').replace('}', ''),
            replacementValue = replacements,
            objectPropertiesInOrderOfDepth = [name], propertyName, level;
        if (name.contains(".")) {

            objectPropertiesInOrderOfDepth = name.split(".");
        }
        for (var i = 0; i < objectPropertiesInOrderOfDepth.length; i++) {
            propertyName = objectPropertiesInOrderOfDepth[i];

            replacementValue = replacementValue != null
                && replacementValue[propertyName] != null
                ? replacementValue[propertyName] : null;

        }

        return replacementValue != null ? replacementValue : token;
    }
    ).replace(/\{\%/g, '{').replace(/\%\}/g, '}');

};