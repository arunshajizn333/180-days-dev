const person1 = {
    name: "Arun"
};

const person2 = {
    name: "Rahul"
};

function printName() {
    console.log(this.name);
}

// printName.call(person1)
// printName.call(person2)

const user={name :"arun"}

function introduce(age, city) {
    console.log(`${this.name} is ${age} years old and he lives in ${city}`);    
}

introduce.call(user,24,"Thrissur");