// console.log("1");

// const p = new Promise((resolve) => {
//     console.log("2");
//     resolve("3");
// });

// p.then(value => console.log(value));

// console.log("4");

// p.then(value => console.log(value + " again"));

// console.log("5");

// async function test() {
//     console.log("A");

//     await Promise.resolve("B");

//     console.log("C");

//     await Promise.resolve("D");

//     console.log("E");
// }

// console.log("F");

// test();

// console.log("G");

function task(name, time) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(name);
            resolve();
        }, time);
    });
}

async function sequential() {
    console.time("Sequential Time");
   await task("A",2000)
    await task("B",1000)
    await task("C",1000)
    console.timeEnd("Sequential Time");
    
}
// sequential()



async function parallel() {
    console.time("Parallel Time");

    const P1= task("A",2000);
    const P2= task("B",1000)
    const P3= task("C",1000)

    await Promise.all([P1,P2,P3])
    
    

    console.timeEnd("Parallel Time");
}

// parallel()

const a = Promise.reject("A");

const b = new Promise(resolve =>
    setTimeout(() => resolve("B"), 2000)
);

const c = new Promise(resolve =>
    setTimeout(() => resolve("C"), 1000)
);

Promise.race([a, b, c])
    .then(console.log)
    .catch(console.log);

Promise.any([a, b, c])
    .then(console.log)
    .catch(console.log);

