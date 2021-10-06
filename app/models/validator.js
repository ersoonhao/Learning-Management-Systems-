exports.validType = (value, type) => {
    if(value != null && typeof value !== type){
        console.log(`Invalid ${type}: ${value}`);
        return false;
    }
    return true;
}