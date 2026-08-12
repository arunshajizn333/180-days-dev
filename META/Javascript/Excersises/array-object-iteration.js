var dairy=["cheese", "milk", "yogurt", "butter"];

function logDairy(){
    for(var item of dairy){
        console.log(item);
    }
}

logDairy();

const animal = {
    canJump: true
};

const bird = Object.create(animal);
bird.canFly = true;
bird.hasFeathers = true;



function birdCan() {
    for (let prop of Object.keys(bird)) {
        console.log(`${prop}: ${bird[prop]}`);
    }
}


birdCan();


var animal=Object.create(bird)
animal.color="red"

console.log(animal);


function animalCan() {
    for (let prop in bird) {
        console.log(`${prop}: ${bird[prop]}`);
    }
}

animalCan();