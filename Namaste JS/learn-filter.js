const users=[
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
  { id: 4, name: 'David', age: 40 },
];



// Get users whose age is greater than 30
const Q1=users.filter(user=>user.age>30)
console.log(Q1);

// Get users whose age is 30 or greater.
const Q2=users.filter(user=>user.age>=30)
console.log(Q2);

// Get users whose age is less than 35.
const Q3=users.filter(user=>user.age<35)
console.log(Q3);

// Get the user whose name is "Charlie".

const Q4=users.filter(user=>user.name=="Charlie")   
console.log(Q4);

// Get users whose names start with "A" or "D".
const Q5=users.filter(user=>{
  let firstLetter=user.name[0].toUpperCase();
  return firstLetter==="A" || firstLetter==="D"
})
console.log(Q5);

// Get users whose IDs are even.
const Q6=users.filter(user=>user.id%2==0)
console.log(Q6);

// Get users who are between 25 and 35 years old.

const Q7=users.filter(user=>user.age>=25 && user.age<=35)
console.log(Q7);