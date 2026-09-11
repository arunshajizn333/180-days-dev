const root=ReactDOM.createRoot(document.getElementById("root"))

{/* <div id="parent">
    <div id="child1">
        <h1>Am Child 1 H1 tag</h1>
        <h2>Am Child 1 H2 tag</h2>
    </div>
    <div id="child2">
        <h1>Am Child 2 H1 tag</h1>
        <h2>Am Child 2 H2 tag</h2>
    </div>
</div> */}


const Parent=React.createElement("div",{id : "parent"},[
    React.createElement("div",{id : "chid1"},[
         React.createElement("h1",{},"Am Child 1 H1 tag"),
         React.createElement("h2",{},"Am Child 1 H2 tag")
    ]),
     React.createElement("div",{id : "chid2"},[
         React.createElement("h1",{},"Am Child 2 H1 tag"),
         React.createElement("h2",{},"Am Child 2 H2 tag")
    ])
])
    








root.render(Parent)
