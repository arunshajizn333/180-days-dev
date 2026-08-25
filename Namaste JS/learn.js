
// function x(i) {

//   for (var i = i; i <= 5; i++) {
//     function closure(num) {
//       setTimeout(function () {

//         console.log(num);
//       }, num * 1000);
//     }
//     closure(i);
//   }




// }


// x(1)

function outer(){
  let a=100;
  function inner(){
    console.log(a);
  }
  return inner;
  
}
outer()();

function counter(i){  
  var count=0;
  function increment(){
    count++;
    console.log(count);
  }
  return increment;
}
const counter1 = counter();
counter1();
counter1();
counter1();

function arraySum(arr){
  var sum=0;
  function inner(){
    for(let i=0;i<arr.length;i++){
      sum+=arr[i];
    }
    console.log(sum);
  }
  return inner; 

}
const sum1 = arraySum([1, 2, 3, 4, 5]);
sum1();

// Constructor Function & Data Hiding / Encapsulation using Closures
function CounterConstructor() {
  var count = 0;
  this.incrementCount = function () {
    count++;
    console.log(count);
  };
  this.decrementCount = function () {
    count--;
    console.log(count);
  };
}

const counter2 = new CounterConstructor();
counter2.incrementCount();
counter2.incrementCount();
counter2.decrementCount();

// Function to find the largest number in an array
function findLargest(arr) {
  if (!arr || arr.length === 0) return null;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

console.log(findLargest([3, 7, 2, 9, 5])); // Output: 9