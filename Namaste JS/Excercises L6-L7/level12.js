console.log("Start");

async function test() {
    console.log("Inside 1");

    await Promise.resolve();

    console.log("Inside 2");
}

test();

console.log("End");