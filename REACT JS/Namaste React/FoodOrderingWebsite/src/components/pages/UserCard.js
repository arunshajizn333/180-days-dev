import React from "react";

class UserCard extends React.Component {
    constructor(props){
        super(props);
        console.log("Child - constrcutor" + " " + this.props.name);

        this.state={
            count :  0

        }

    }

     ComponentDidMount(){
        console.log("Child - ComponentDidMount" + " " + this.props.name);
    }

    render(){
        const {name,location}=this.props
         console.log("Child - render"+ " " + this.props.name);

        return(
            <div>
                <h1>{name}</h1>
                <p>{location}</p>
              <h4>{this.state.count}</h4>
                <button onClick={()=>{
                    this.setState({
                        count : this.state.count+1,
                    }
                    )
                }}>+</button>
                

            </div>
        )
    }  
}

export default UserCard;