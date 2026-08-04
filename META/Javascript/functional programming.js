function fib(n) {
    // Base cases
    if (n === 0) return 0;
    if (n === 1) return 1;

    // Recursive case
    return fib(n - 1) + fib(n - 2);
}


// console.log(fib(5));  
// console.log(fib(10)); 

// Task 1: Build a function-based console log message generator
function consoleStyler(color, background, fontSize, txt) {
    var message="%c" + txt;
    var style = `color: ${color};`;
    style += `background: ${background};`;
    style += `font-size: ${fontSize};`;


    
    console.log(message,style)
    
}

// Task 2: Build another console log message generator
function celebrateStyler(reason) {
    var fontStyle = "color: tomato; font-size: 50px";
   
    if (reason === "birthday") {
        console.log(`%cHappy birthday`, fontStyle);
    } else if(reason==="champions"){
        console.log(`%cCongrats on the title!`, fontStyle);
    } else {
        console.log(reason, fontStyle)
    }

}


// Task 3: Invoke the Functions

function styleAndCelebrate(color, background, fontSize, txt, reason) {
    consoleStyler(color,background,fontSize,txt);
    
    celebrateStyler(reason)

}

// styleAndCelebrate('#1d5c63', '#ede6db', '40px', 'Congrats!','birthday')


    // var globalVar = 77;

    // function scopeTest() {
    //     var localVar = 88;
    // }

    // console.log(localVar);

    
    function meal(animal) {

        console.log("log : ",animal.food);
        animal.food = animal.food + 10;
 console.log("after : ",animal.food);

    }

    var dog = {
        food: 10
    };
    meal(dog);
    meal(dog);

    console.log(dog.food);