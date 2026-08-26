const users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 35 },
    { id: 4, name: "David", age: 40 }
];

// Find the total age of users older than 30.

const Q1=users.filter(user=>user.age>30).reduce((acc,curr)=>{
    acc+=curr.age
    return acc;
},0)
console.log(Q1);

// Find the total age of users younger than 35.

const Q2=users.filter(user=>user.age<35).reduce((acc,curr)=>{
    acc+=curr.age
    return acc;
},0)
console.log(Q2);

// Find the average age of users older than 25.

const filteresusers=users.filter(user=>user.age>25)

const Q3= filteresusers.reduce((acc,curr)=>{
    acc+=curr.age
    return acc
},0)/filteresusers.length


console.log(Q3);

// Count how many users are aged 30 or older.

const userslegth=users.filter(user=>user.age>=30).length
console.log(userslegth);



