const p1 = Promise.resolve("User");
const p2 = Promise.reject("Settings Error");
const p3 = Promise.resolve("Permissions");

Promise.allSettled([p1, p2, p3])
  .then(results=>{
    results.forEach(result=>{
        if(result.status=="fulfilled"){
            console.log(`Succes : ${result.value}`); 
        }
        else{
             console.log(`Failed : ${result.value}`); 
        }
    })

  });

  Promise.allSettled([
    Promise.resolve("A"),
    Promise.reject("B")
]).then(console.log);

