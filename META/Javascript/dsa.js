

let randomNum=[1, 2, 3, 3, 4, 4]


const numbersSet = new Set(randomNum);

// console.log(numbers);
// console.log(numbers.size);

// randomNum.forEach((number,index) => {
//     console.log(index,number);
// });

// const add=(a,b)=>a+b;
// console.log( add(5,5));



// const fruits = ["Apple", "Banana", "Mango", "Orange"];

// fruits.forEach(fruit=> console.log(fruit))

// fruits.forEach(function(fruit){
//      console.log(fruit)})


// const numbers = [1, 2, 3, 4, 5];

// const newNum= numbers.map(num=>num*2);
// console.log(newNum);

// const numbers2 = [10, 15, 20, 25, 30, 35];

// const greatNum=numbers2.filter(num=>num>20)

// console.log(greatNum);



const numbers = [10, 20, 20, 30, 30, 40, 50, 50];

const unique= new Set(numbers)

console.log(unique);

unique.add(60);
console.log(unique.has(30));
unique.delete(20);
const result = [...unique];