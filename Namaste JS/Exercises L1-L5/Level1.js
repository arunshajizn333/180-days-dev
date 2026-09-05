const Q2= new Promise ((res,rej)=>{
    setTimeout(function(){
        res("Data Recieved")
    },2000)

})

Q2.then(value=>console.log(value))

const Q3= new Promise ((res,rej)=>{
    setTimeout(function(){
        rej("Something went wrong")
    },1000)

})

Q3
.then(value=>console.log(value))
.catch(err=>console.log(err))
