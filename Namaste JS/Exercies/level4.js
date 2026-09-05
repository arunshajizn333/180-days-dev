// const p1 = new Promise(resolve =>
//     setTimeout(() => resolve("P1"), 3000)
// );

// const p2 = new Promise(resolve =>
//     setTimeout(() => resolve("P2"), 1000)
// );

// const p3 = new Promise(resolve =>
//     setTimeout(() => resolve("P3"), 2000)
// );

// Promise.all([p1, p2, p3])
//     .then(result => console.log(result));





const p1 = new Promise(resolve =>
    setTimeout(() => resolve("P1"), 3000)
);

const p2 = new Promise((resolve, reject) =>
    setTimeout(() => reject("P2 Failed"), 1000)
);

const p3 = new Promise(reject =>
    setTimeout(() => reject("P3"), 2000)
);

Promise.all([p1, p2, p3])
    .then(console.log)
    .catch(console.log);