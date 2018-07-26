/**
 * Returns true if this string has at least one occurrence of supplied text
 * @param {String} needle The string to look for
 * @return {Boolean}
 */
String.prototype.contains = function(needle) {
    return this===needle || this.indexOf(needle) != -1;
};


String.prototype.format = function(args) {

    var replacements = args,
        str = this;

    if (args instanceof String) {
        replacements = [args];

    }

    if (replacements instanceof Array) {
        return str.replace(String.prototype.format.regex, function(item) {
            var intVal = parseInt(item.substring(1, item.length - 1));
            var replace;
            if (intVal >= 0) {
                replace = replacements[intVal];
            } else if (intVal === -1) {
                replace = "{";
            } else if (intVal === -2) {
                replace = "}";
            } else {
                replace = "";
            }
            return replace;
        });
    } else {

        return str.replace(/{.+?}/g, function(token) {

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
    }
};