// Dishes Data
const dishData = [
    { name: 'Italian pasta', price: 9.55 },
    { name: 'Rice with veggies', price: 8.65 },
    { name: 'Chicken with potatoes', price: 15.55 },
    { name: 'Vegetarian Pizza', price: 6.45 }
]

// Tax Value 
const tax = 1.20;

// Task 1: Implement getPrices()

function getPrices(taxBoolean) {
    for (let dish of dishData) {
        let finalPrice;
        if (taxBoolean === true) {
            finalPrice = dish.price * tax;
            console.log(`Dish: ${dish.name} Price:$ ${finalPrice}`);

        } else if (taxBoolean === false) {
            finalPrice = dish.price;
            console.log(`Dish: ${dish.name} Price (excl.tax):$ ${finalPrice}`);

        } else {
            console.log("You need to pass a boolean to the getPrices call!");
            return;
        }

    }
}


// Task 2: Implement getDiscount()
function getDiscount(taxBoolean, guests) {
    getPrices(taxBoolean);
    if (typeof guests === 'number' && guests > 0 && guests < 30) {
        let disCount=0;
        if (guests < 5) {
            disCount = 5;
        } else if (guests >=5) {
            disCount = 10;
        }
        console.log(`Discount is:$ ${disCount}`);
        
    } else {
        console.log(" The second argument must be a number between 0 and 30");
    }
}

getDiscount(true, 2);
getDiscount(false, 10);

