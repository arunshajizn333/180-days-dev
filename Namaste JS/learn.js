function validatePalindrome(str) {
    const word=str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    var viceVersa="";
    for(var i=word.length-1;i>=0;i--){
         viceVersa +=word[i]
    }
    if (word===viceVersa){
        return true;
    }else{
        return false;
    }
    
}

//For the purpose of user debugging.
validatePalindrome("race a car");

module.exports = validatePalindrome