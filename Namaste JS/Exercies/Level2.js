async function test() {
    return "Hello"
}

async function main() {
    let data= await test()
    console.log(data);
}

// main()

// Q7. Sequential execution

const p1= new Promise ((res,rej)=>{
    setTimeout(function(){
        res("First")
    },2000)

})
const p2= new Promise ((res,rej)=>{
    setTimeout(function(){
        res("Second")
    },3000)

})
const p3= new Promise ((res,rej)=>{
    setTimeout(function(){
        res("Third")
    },4000)

})

// async function sequential() {
//     const data1=await p1
//     console.log(data1);
    
//     const data2=await p2
//      console.log(data2);
    
//     const data3=await p3
//      console.log(data3);
    
// }
// sequential()
const data=Promise.all([p1,p2,p3])
console.log(await data);
