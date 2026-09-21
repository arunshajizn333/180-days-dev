import React from "react";
import ReactDOM from "react-dom/client";

import NavBar from "./components/NavBar"
import HeroSection from "./components/HeroSection.js";
import CategorySection from "./components/CategorySection.js";
import RestaurantSection from "./components/RestaurantSection.js";

import { RESTAURANTS } from "./utils/mockDatas.js";

const App = () => {
  


  return(
      <div className="app-container">
    <NavBar />
    <HeroSection />
    <CategorySection />
    <RestaurantSection restaurantList={RESTAURANTS} />
  </div>
  )

}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
