// OBJECTS
const review = {
    title: "Amazing Product",
    description: "This product exceeded my expectations.",
    author: "John Doe",
    timePosted: "2024-11-24"
};

const { author, title, timePosted } = review;

// Destructure the author, title, and timePosted properties from the review object
console.log(`${author} posted a review titled, ${title} at ${timePosted}.`);

// ARRAY

const products = [
    ["Laptop", 1000],
    ["Phone", 500],
    ["Tablet", 700]
];
// Destructure the second product's name and price from the array
const [,[secondProductName,secondProductPrice]]=products

console.log(`Second product: ${secondProductName}`);
console.log(`Second product price: ${secondProductPrice}`);
