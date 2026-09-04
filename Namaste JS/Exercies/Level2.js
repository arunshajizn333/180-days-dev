async function test() {
    return "Hello"
}

async function main() {
    let data= await test()
    console.log(data);
}

main()

