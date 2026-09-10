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