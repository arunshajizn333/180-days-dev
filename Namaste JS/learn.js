
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