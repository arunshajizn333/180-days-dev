// Code to change
function createOrder() {
    return Promise.resolve({ orderId: 101 });
}

function makePayment(orderId) {
    return Promise.resolve({
        orderId: orderId,
        paymentId: 5001
    });
}

function showSummary(paymentDetails) {
    return Promise.resolve(
        `Order ${paymentDetails.orderId} paid successfully`
    );
}

// Your Work

createOrder()
.then(order=>makePayment(order.orderId))
.then(paymentDetails=>showSummary(paymentDetails))
.then(summary=>console.log(summary))


// TASK 2

function getUser() {
    return Promise.resolve({
        id: 10,
        name: "Arun"
    });
}

function getOrders(userId) {
    return Promise.resolve([
        { id: 101, amount: 500 },
        { id: 102, amount: 800 }
    ]);
}

function calculateTotal(orders) {
    return Promise.resolve(
        orders.reduce((total, order) => total + order.amount, 0)
    );
}

// Chaining Task Two

getUser()
.then(user=>getOrders(user.userId))
.then(orders=>calculateTotal(orders))
.then(ordertotal=>console.log(ordertotal))

// 🟡 Task 3 — Transform the Data

function getProducts() {
    return Promise.resolve([
        { name: "Laptop", price: 50000 },
        { name: "Mouse", price: 1000 },
        { name: "Keyboard", price: 3000 }
    ]);
}

function applyDiscount(products) {
    return Promise.resolve(
        products.map(product => ({
            ...product,
            price: product.price * 0.9
        }))
    );
}

// Chaining Task 3

getProducts()
.then(products=>applyDiscount(products))
.then(productWithDiscountPrice=>console.log(productWithDiscountPrice))


// 🟠 Task 4 — Understand return
function getNumber() {
    return Promise.resolve(10);
}

function multiply(number) {
    return Promise.resolve(number * 2);
}

// TASK 4 CHAINING
getNumber()
.then(num=>multiply(num))
.then(result=>console.log(result))

// 🔴 Task 5 — Three-Step Chain
function getPrice() {
    return Promise.resolve(1000);
}

function applyTax(price) {
    return Promise.resolve(price * 1.18);
}

function applyDiscount(price) {
    return Promise.resolve(price - 100);
}

// TASK 5 Chaining
getPrice()
.then(price=>applyTax(price))
.then(taxedPrice=>applyDiscount(taxedPrice))
.then(final=>console.log(final))

// 🔥 Task 6 — Realistic API Flow
function login() {
    return Promise.resolve({
        userId: 42,
        username: "Arun"
    });
}

function getUserProfile(userId) {
    return Promise.resolve({
        userId: userId,
        role: "Developer",
        experience: "Beginner"
    });
}

function getPermissions(role) {
    return Promise.resolve([
        "read",
        "write",
        "delete"
    ]);
}

// TASK 6 CHAINING

login()
.then(userDetails=>getUserProfile(userDetails.userId))
.then(user=>getPermissions(user.role))
.then(userPermission=>console.log(userPermission))