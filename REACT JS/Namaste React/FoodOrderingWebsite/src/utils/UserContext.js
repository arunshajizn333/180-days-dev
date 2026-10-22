import { createContext } from "react";

const UserContext = createContext({
    loggedInUser : "GuestUser"
})

export default UserContext;