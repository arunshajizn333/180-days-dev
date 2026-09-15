import React from "react";
import ReactDOM from "react-dom/client";


const root = ReactDOM.createRoot(document.getElementById("root"));

{
  /* <div id="parent">
    <div id="child1">
        <h1>Am Child 1 H1 tag</h1>
        <h2>Am Child 1 H2 tag</h2>
    </div>
    <div id="child2">
        <h1>Am Child 2 H1 tag</h1>
        <h2>Am Child 2 H2 tag</h2>
    </div>
</div> */
}

// const Parent = React.createElement("div", { id: "parent" }, [
//   React.createElement("div", { id: "chid1" }, [
//     React.createElement("h1", {}, "Am Child 1 H1 tag"),
//     React.createElement("h2", {}, "Am Child 1 H2 tag"),
//   ]),
//   React.createElement("div", { id: "chid2" }, [
//     React.createElement("h1", {}, "Am Child 2 H1 tag"),
//     React.createElement("h2", {}, "Am Child 2 H2 tag"),
//   ]),
// ]);

// JSX

// React Element
const heading = (
  <h1 className="head" tabIndex={5}>
    namaste javascript
  </h1>
);

const Title =()=>(
  <div>
    <h1>
      Title of our page 
    </h1>
  </div>

)


// React Functionel Component and Functionel Composition
const HeadingComponent = ()=>(
  <div>
    <Title/>
    <h1 className="new h1">
    Hi from inside of component
  </h1>

  </div>
  
)

// Another way of writing Functional Component

const HeadingComponent2=()=>{
  return <div>
    <h1 className="new h1">
    Hi from inside of  component  from HeadingComponent2
  </h1>

  </div>
}


root.render(<HeadingComponent/>);


