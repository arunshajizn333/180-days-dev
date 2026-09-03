const p = new Promise((resolve, reject) => {
    return resolve("Hello")
})

const test = async () => {
    let data = await p;
    console.log(data);
}
test()




