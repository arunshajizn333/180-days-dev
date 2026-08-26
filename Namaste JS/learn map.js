const users=[
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
  { id: 4, name: 'David', age: 40 },
];

// Create an array containing only the names.

const names= users.map(user=>user.name)
console.log(names);

// Create an array containing only the ages.

const ages= users.map(user=>user.age)
console.log(ages);


// Create an array containing the user IDs.
const IDs= users.map(user=>user.id)
console.log(IDs);


// Create a new array where every name is uppercase.

const namesUpper= users.map(user=>user.name.toUpperCase())
console.log(namesUpper);

// Create a new array where each user gets a new property:

const newUser=users.map(user=>({...user,isAdult:true}))
console.log(newUser);


console.log(users);


// Create an array containing sentences like:

// "Alice is 25 years old"
// "Bob is 30 years old"
// "Charlie is 35 years old"
// "David is 40 years old"

const newArray=users.map(user=>user.name+" is "+ user.age+" years old")
console.log(newArray);
