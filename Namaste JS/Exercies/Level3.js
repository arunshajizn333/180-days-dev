const data = fetch("https://jsonplaceholder.typicode.com/users/1")

async function connectUser() {

    try {
        const userData = await data
        const user1 = await userData.json() 
        return user1

    }
    catch (error) {
        console.error("Failed to fetch data");
    }


}


async function UserDetails() {

    const userDetail = await connectUser()
    const { name, email } = userDetail
    const { city } = userDetail.address

    console.log(name, email, city);
}

UserDetails()



