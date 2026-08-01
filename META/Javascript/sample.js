
function getDayMessage(day) {
switch (day){
    case "Monday":
        console.log('Do something');
        break;
    case "Tuesday":
        console.log('Do something else');
        break;      
    case "Wednesday":
        console.log('Do another thing');
        break;
    case "Thursday": 
        console.log('Do something different');  
        break;
    case "Sunday":
        console.log('Do nothing');
        break;
    default:
        console.log('Invalid day');
        break;
}}
// getDayMessage("Monday");

function electricityBill(dailyUnits) {
    let Unitprice=0.4;
    let  dailyUsage=dailyUnits*Unitprice;
    let monthlyUsage=dailyUsage*30;

    console.log(`Your daily electricity bill is: ${dailyUsage.toFixed(2)}`);
    console.log(`Your monthly electricity bill is: ${monthlyUsage.toFixed(2)}`);

}
// electricityBill(20);

function letterFinder(arr){
 for(let i=0;i<=arr.length-1;i++){
    let t="t"
    if(arr[i]==t){
        console.log("Found the t at " ,i)
    }else{
         console.log("---No match found at  " ,i)

    }
 }  
}
// letterFinder("test");
function clothesArray(){
    var clothes=["shirt","pants","socks","shoes","hat","jacket"];
    console.log(clothes);
    
    clothes.pop(clothes[5])
    console.log(clothes);

    clothes.push("gloves");
    console.log(clothes);

    var favCar={};
    favCar.color="red";
    favCar.convertible=true;

    console.log(favCar);


}
// clothesArray();

// var d=Math.random()*10;
// console.log(Math.ceil(d));

//example of adding properties and methods to an object
// var car = {};
// car.mileage = 98765;
// car.color = "red";
// console.log(car);
// car.turnTheKey = function() {
//     console.log("The engine is running")
// }
// car.lightsOn = function() {
//     console.log("The lights are on.")
// }
// console.log(car);
// car.turnTheKey();
// car.lightsOn()


employees=[
   
]

function findoldestEmployee(employees){
    if(employees.length === 0){
        console.log("No employees found.");
        return null;
    }
    let oldestEmployee=employees[0];

    for(let i=1; i<employees.length; i++){
        if(employees[i].age > oldestEmployee.age){
            oldestEmployee = employees[i];
        }
    }
    return oldestEmployee;
}
// var oldestEmployee = findoldestEmployee(employees);
// console.log(oldestEmployee);
