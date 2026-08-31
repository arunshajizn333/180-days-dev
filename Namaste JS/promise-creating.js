// const identifier = new Promise((resolve, reject) => {
//   let ishuman = false;

//   if (ishuman) {
//     resolve({
//       name: "arun"
//     });
//   } else {
//     reject("is not a human");
//   }
// });

// identifier
// .then(user=>console.log(user.name))
// .catch(err=>console.log(err))

// HOME WORK BY NAMASTE DEV

let cart = [
  { name: "mobile", price: 20000 },
  { name: "laptop", price: 50000 }
]

function validateCart() {
  return true
}



function createOrder(cart) {
  return new Promise((resolve, reject) => {

    if (validateCart()) {
      resolve({
        orderid: "sdfjk01",
        orderitems: cart


      })
    }
    else {
      const err = new Error("cart not valid")
      reject(err)
    }
  })


}

function proceedToPayment(orderDetails) {
  return new Promise((resolve, reject) => {

    resolve({
      orderid: orderDetails.orderid,
      orderAmt: orderDetails.orderitems
        .map(item => item.price)
        .reduce((acc, curr) => acc + curr, 0),
      paymentStatus: true
    })
  })
}



function orderSummary(paymentInfo) {
  return new Promise((resolve, reject) => {
    if (paymentInfo.paymentStatus == true) {
      resolve({
        orderSummary_msg: `Your payment of ${paymentInfo.orderAmt} has been successfull Completed`,
        orderId_msg: `order id : ${paymentInfo.orderid}`
      })
    }
    else {
      const err = new Error("cart not valid")
      reject(err)
    }
  }
  )
}
function updateWallet(summary) {
  return new Promise((resolve, reject) => {
    resolve({
      orderSummary_msg: summary.orderSummary_msg,
      orderId_msg: summary.orderId_msg
    });

  });
}

createOrder(cart)
  .then(orderDetails => proceedToPayment(orderDetails))
  .then(paymentInfo => orderSummary(paymentInfo))
  .then(summary => updateWallet(summary))
  .then(result => console.log(result))
  .catch(err => console.log(err))


  