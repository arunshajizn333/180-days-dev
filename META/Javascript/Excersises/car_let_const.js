// This is the initial code using `var` with some issues to fix.

let x = 5; // letiable declaration and initialization
 x = 10; // Redeclaration, works with let but not allowed with let

 // Hoisting example: letiable is used before declaration
let a = 20;
console.log(a);

if (true) {
    let z = 30; // letiable declared with let is accessible outside block
    console.log(z); 
}

let b = 40; // Variable that changes value
b = 50; // Should be let, as it changes value
    console.log(b); 


const PI = 3.14159; // Declared as a variable but should ideally be a constant
      console.log(PI); 

