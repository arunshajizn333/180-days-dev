// ==========================================
// LEVEL 3 — REDUCE()
// ==========================================
const users=[
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
  { id: 4, name: 'David', age: 40 },
];


// Q8. Find the total of all users' ages.
// Expected: 130

const Q8=users.reduce((acc,curr)=>{
     acc+=curr.age;
     return acc  
},0)
console.log(Q8);



// Q9. Find the average age of all users.
// Expected: 32.5
const Q9=users.reduce((acc,curr)=>{
    acc+=curr.age;
    return acc;
},0)/users.length
console.log(Q9);

// Q10. Find the oldest user.
// Return the complete user object.
// Expected: { id: 4, name: "David", age: 40 }
const Q10=users.reduce((acc,curr)=>{
 let oldest=acc
 if(acc.age<curr.age){
    oldest=curr;
 }
 return oldest;

},users[0])
console.log(Q10);


// Q11. Find the youngest user.
// Return the complete user object.
// Expected: { id: 1, name: "Alice", age: 25 }
const Q11=users.reduce((acc,curr)=>{
 let youngest=acc
 if(acc.age>curr.age){
    youngest=curr;
 }
 return youngest;

},users[0])
console.log(Q11);


// Q12. Count how many users are in the array.
// Expected: 4
const Q12=users.reduce((acc,curr)=>{
   acc=acc+1;
   return acc

},0)
console.log(Q12);


// Q13. Create an object containing each user's name using their ID as the key.
// Expected:
// {
//   1: "Alice",
//   2: "Bob",
//   3: "Charlie",
//   4: "David"
// }

const Q13=users.reduce((acc,curr)=>{
    acc[curr.id]=curr.name
    
return acc
},{})
 
console.log(Q13);

// Build a sentence
 const names = ["Alice", "Bob", "Charlie", "David"];

const sentance=names.reduce((acc,curr,index)=>{
   if(index<names.length-1){
      acc+=curr + ", "
   }
   else{
      acc+=curr 
   }
   
return acc
},"")

console.log(sentance);

// Use reduce() to create an object where the key is the user's name and the value is their age.

const output=users.reduce((acc,curr)=>{
   acc[curr.name]=curr.age;
   return acc

},{})
console.log(output);


