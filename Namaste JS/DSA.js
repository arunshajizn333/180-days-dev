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

function sum(...args) {
    let nums = [...args];
    let sum = 0;
    nums.forEach(num => sum += num)

    return sum;
}

//For the purpose of user debugging.
sum(100, 200, 300, 400);

module.exports = sum


function findMaxNumber(arr) {
    if (arr.length === 0) {
        return null;
        
    } 
        let largest = arr.reduce((max, num) => {
            return num > max ? num : max;
        });

        return largest;
    
    }
    

findMaxNumber([1, 2, 3, 4, 5]);

module.exports = findMaxNumber;