// Part 2: Handle Unknown Function Arguments
function unknownArgs(...args) {
    args.forEach(element => {
        console.log(element);
        
    });
}

unknownArgs(1, 2, 3, 4, 5);
unknownArgs("a", "b", "c");

// Part 3: Merge Arrays
const favoriteBaseballTeams = ["Yankees", "Mets", "Dodgers", "Giants", "Red Sox", "Cubs"];
const favoriteFootballTeams = ["Patriots", "Giants", "Jets", "Eagles", "Steelers", "Cowboys"];

const teamMembers=[...favoriteBaseballTeams,...favoriteFootballTeams];
console.log(teamMembers);

// Part 1: Separate Array Elements
const topSixRestaurants = ["Chick-fil-A", "In-N-Out", "Chipotle", "McDonald's", "Taco Bell", "KFC"];

const [first,second,...rest]=topSixRestaurants;

console.log(`first : ${first}`);
console.log(`second : ${second}`);
console.log(`remaining : ${rest}`);
