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