// create your classes here
class House{
    doorOpen(){
        console.log("Someone Arrived");
    }

}
class Lights extends House{
    doorOpen(){
        super.doorOpen();
        console.log("lights turned on")
    }
}
class Cctv extends House{
    doorOpen(){
        console.log("Camera Tracking On");
        
    }
}

var guestHouseLights= new Lights();
var guestHouseSecuity= new Cctv();

// guestHouseLights.doorOpen()
// guestHouseSecuity.doorOpen()


//Custom CONSTRUCTORS

function Icecream(flavor) {
    this.flavor = flavor;
    this.meltIt = function() {
        console.log(`The ${this.flavor} icecream has melted`);
    }
}

let kiwiIcecream = new Icecream("kiwi");
let appleIcecream = new Icecream("apple");

console.log(kiwiIcecream);


// kiwiIcecream.meltIt(); 
// console.log(kiwiIcecream.flavor);

// appleIcecream.meltIt(); 
// console.log(appleIcecream.flavor);


