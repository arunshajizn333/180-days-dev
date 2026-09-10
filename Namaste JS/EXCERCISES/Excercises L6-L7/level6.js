const p1 = new Promise(resolve =>
    setTimeout(() => resolve("Success"), 3000)
);

const p2 = new Promise((resolve, reject) =>
    setTimeout(() => reject("Failed"), 1000)
);

Promise.race([p1, p2])
    .then(console.log)
    .catch(console.log);

Promise.any([p1, p2])
    .then(console.log)
    .catch(console.log);




Promise.any([
    Promise.reject("A"),
    Promise.reject("B"),
    Promise.reject("C")
])
.catch(err => {
    console.log(err);
});    
