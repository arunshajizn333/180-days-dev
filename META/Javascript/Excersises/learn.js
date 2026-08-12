const users = [

  { id: 101, name: " Ada ", scores: [10, 20, 30] },

  { id: 102, name: "", scores: [5, 0, 15] },

  { id: 103, name: null, scores: [7, 14] },

  { id: 104, /* name missing on purpose */ scores: [3, 3, 3, 3] },

  { id: 105, name: "Grace", scores: [] }

];
function normalizeName(value) {
    if(typeof value === "undefined" || value.trim()==="" || value === null ){
        return "Unknown";}
    return value.trim();
}

function getUserAverageScore(scores) {
    try{
        if (!Array.isArray(scores)) {
            throw new Error("Scores must be an array.");
            return null;
        }
        const sum=scores.reduce((acc, score) => acc + score, 0);
        const average = scores.length > 0 ? sum / scores.length : 0;
  
      return Math.round(average * 100) / 100;
    }    catch(error){
        console.error(error.message);
        return null;
    }


}

function buildUserSummary(user){

}

function summarizeUsers(userArray){

}

function safeSummarizeUsers(userArray){

}

function getUserDisplayNameById(userArray, id){

}






// // SOLUTIONS

// // --- STARTER DATA ---
// const users = [
//   { id: 101, name: " Ada ", scores: [10, 20, 30] },
//   { id: 102, name: "", scores: [5, 0, 15] },
//   { id: 103, name: null, scores: [7, 14] },
//   { id: 104, /* name missing on purpose */ scores: [3, 3, 3, 3] },
//   { id: 105, name: "Grace", scores: [] }
// ];

// // --- TASKS IMPLEMENTATION ---

// // Task 1: normalizeName(value)
// function normalizeName(value) {
//   if (value === null || typeof value === "undefined" || value.trim() === "") {
//     return "Unknown";
//   }
//   return value.trim();
// }

// // Task 2: averageScore(scores)
// function averageScore(scores) {
//   if (!Array.isArray(scores)) {
//     throw new Error("scores must be an array");
//   }
//   if (scores.length === 0) {
//     return null;
//   }
//   const sum = scores.reduce((acc, score) => acc + score, 0);
//   const avg = sum / scores.length;
//   return Math.round(avg * 100) / 100;
// }

// // Task 3: buildUserSummary(user)
// function buildUserSummary(user) {
//   if (typeof user !== "object" || user === null) {
//     throw new Error("user must be an object");
//   }

//   const name = normalizeName(user.name);
//   const userScores = user['scores']; // Bracket notation used here

//   let scoreCount = 0;
//   let avg = null;

//   if (Array.isArray(userScores)) {
//     scoreCount = userScores.length;
//     avg = averageScore(userScores);
//   }

//   return {
//     id: user.id, // Dot notation used here
//     name: name,
//     scoreCount: scoreCount,
//     avg: avg
//   };
// }

// // Task 4: summarizeUsers(userArray)
// function summarizeUsers(userArray) {
//   if (!Array.isArray(userArray)) {
//     throw new Error("userArray must be an array");
//   }
//   return userArray.map(buildUserSummary);
// }

// // Task 5: safeSummarizeUsers(userArray)
// function safeSummarizeUsers(userArray) {
//   try {
//     const data = summarizeUsers(userArray);
//     return { ok: true, data: data };
//   } catch (err) {
//     return { ok: false, error: err.message };
//   }
// }

// // Task 6: getUserDisplayNameById(userArray, id)
// function getUserDisplayNameById(userArray, id) {
//   if (!Array.isArray(userArray)) {
//     throw new Error("userArray must be an array");
//   }
//   if (typeof id !== "number") {
//     throw new Error("id must be a number");
//   }

//   const foundUser = userArray.find(u => u.id === id);
//   if (!foundUser) {
//     throw new Error("user not found");
//   }

//   return normalizeName(foundUser.name);
// }

// // --- PART C ANSWERS ---
// // Part C answers:
// // 1) typeof undefined = "undefined"
// // 2) typeof null = "object"
// // 3) Why treat "" differently than null/undefined in normalizeName (conceptually)?
// //    - Conceptually, undefined represents an unassigned variable or missing property, null represents an intentional absence of value, and "" represents an existing string value that contains no characters (or only spaces).
// //    - Even though they represent different data types and semantics in JavaScript, all three indicate that a valid display name is missing, so normalizeName normalizes them all to the fallback value "Unknown".

// // --- REQUIRED TEST CALLS ---
// console.log(normalizeName(" Ada "));               // expected: "Ada"
// console.log(normalizeName("   "));                 // expected: "Unknown"
// console.log(normalizeName(null));                  // expected: "Unknown"
// console.log(averageScore([10, 20, 30]));           // expected: 20
// console.log(averageScore([]));                     // expected: null
// console.log(buildUserSummary(users[0]));           // expected: { id: 101, name: 'Ada', scoreCount: 3, avg: 20 }
// console.log(buildUserSummary(users[3]));           // expected: { id: 104, name: 'Unknown', scoreCount: 4, avg: 3 }
// console.log(safeSummarizeUsers(users).ok);         // expected: true
// console.log(getUserDisplayNameById(users, 105));   // expected: "Grace"
// console.log(safeSummarizeUsers("not an array"));   // expected: { ok: false, error: 'userArray must be an array' }