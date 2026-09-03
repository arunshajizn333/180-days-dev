console.log(this);

function x(){
    console.log(this);
    
}
x()

const obj={
    name : "arun",
    print : function(){
        console.log(this);  
    }
}

const obj2={
    name : "arun",
    print : ()=>{
        console.log(this);  
    }
}

const obj3={
    name : "arun",
    print : function(){
        ()=>{
        console.log(this);  
    }
    }
}


