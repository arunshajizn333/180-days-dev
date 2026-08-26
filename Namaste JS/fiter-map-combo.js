const users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 35 },
    { id: 4, name: "David", age: 40 }
];


// Get the names of users older than 30.
// ["Charlie", "David"]

const Q1=users.filter(user=>user.age>30).map(user=>user.name)
console.log(Q1);


// Get the uppercase names of users aged 30 or older.
// ["BOB", "CHARLIE", "DAVID"]

const Q2=users.filter(user=>user.age>=30).map(user=>user.name.toUpperCase())
console.log(Q2);



const Q3=users.filter(user=>user.age>=30).map(user=>{
    return user.name + " - "+user.age
})
console.log(Q3);
