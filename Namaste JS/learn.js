
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