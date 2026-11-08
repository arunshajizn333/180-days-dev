
import React from "react";
import UserCard from "./UserCard";

class UserClass extends React.Component {
    constructor(){
        super();
         console.log(" parent constructor");
    }

    ComponentDidMount(){
        console.log("ComponentDidMount");
    }

    render(){
         console.log(" parent render");

        return(
            <div>
                <UserCard name="John Doe" location="New York" />
                <UserCard name="Jane Smith" location="Los Angeles" />
            </div>
        )
    }  
}

export default UserClass;

