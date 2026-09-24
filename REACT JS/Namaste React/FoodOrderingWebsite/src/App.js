import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";

import NavBar from "./components/NavBar"
import HeroSection from "./components/HeroSection.js";
import CategorySection from "./components/CategorySection.js";
import RestaurantSection from "./components/RestaurantSection.js";




const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  


  return(
      <div className="app-container">
    <NavBar />
    <HeroSection setSearchTerm={setSearchTerm} />
    <CategorySection />
    <RestaurantSection searchTerm={searchTerm} />
  </div>
  )

}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
