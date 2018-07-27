var ObjectUtils = function(){}

ObjectUtils.assign = function(obj1, obj2){
    for(var propertyName in obj2){
        if(obj2.hasOwnProperty(propertyName)){
            obj1[propertyName] = obj2[propertyName]
        }        
    }
    return obj1;
}