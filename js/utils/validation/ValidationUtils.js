var ValidationUtils = {

    /**
     * Validate values in state against rules.
     * 
     * A field name to value map.
     * @param {Object} state 
     * 
     * @typedef {{rule: ValidationRule, args:Object}} ValidationRuleIntent
     * 
     * Maps from a field name to array of ValidationRuleIntent.
     * @param {Object<string,ValidationRuleIntent[]>} rules     
     * 
     * Object to send to the ValidationRule.
     * @param {Object} rules['nameOfField'].args 
     * 
     * Field name to array of errors messages.
     * @returns {Object.<string, String[]>} 
     */
    validate: function (state, rules) {
        var errors = {}, validationIntentsForField;
        for (var fieldName in state) {
            if (!state.hasOwnProperty(fieldName)) {
                continue;
            }

            validationIntentsForField = rules[fieldName];
            validationIntentsForField.forEach(function (validationIntent) {
                var value = state[fieldName],
                    rule = validationIntent.rule,
                    args = validationIntent.args,
                    previousErrors = fieldName in errors? errors[fieldName] : [],
                    newErrors  = rule.validate(value, args),
                    hasErrors = newErrors.length >0;

                if(hasErrors){
                    errors[fieldName] = previousErrors.concat(newErrors);
                }
                
            })
        }

        return errors;
    }
}