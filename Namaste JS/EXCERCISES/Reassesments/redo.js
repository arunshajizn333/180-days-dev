

// Q7. Sequential execution


// TO Make sure the second timer doesn't start until the first operation finishes.

 function timerSettter(time,output){
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
                resolve(output)
        },time)
       
    })

}

async function timerContainer() {
     console.log(await timerSettter(2000,"First"));
     console.log(await timerSettter(3000,"Second"));
     console.log(await timerSettter(4000,"Third"));
    
}
// timerContainer()


// Q8 — Parallel Execution

// const p1= new Promise ((res,rej)=>{
//     setTimeout(function(){
//         res("First")
//     },2000)

// })
// const p2= new Promise ((res,rej)=>{
//     setTimeout(function(){
//         res("Second")
//     },3000)

// })
// const p3= new Promise ((res,rej)=>{
//     setTimeout(function(){
//         res("Third")
//     },4000)

// })

async function parallel() {
    const data=await Promise.all([p1,p2,p3])
    console.log(data);
    
}

// parallel()

const p1 = new Promise(resolve =>
    setTimeout(() => resolve("P1"), 3000)
);

const p2 = new Promise((resolve, reject) =>
    setTimeout(() => reject("P2 Failed"), 1000)
);

const p3 = new Promise((resolve, reject) =>
    setTimeout(() => reject(" rej P3"), 2000)
);

// Promise.all([p1, p2, p3])
//     .then(console.log)
//     .catch(console.log);


"use strict";

const obj = {
    name: "Arun",

    test: function () {
        console.log(this.name);
    }
};

const fn = obj.test;

fn();
 
   
  

 