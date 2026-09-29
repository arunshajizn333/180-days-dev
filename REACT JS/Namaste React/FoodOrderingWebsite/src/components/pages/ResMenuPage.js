import { useEffect, useState } from "react";
import { CORS_FIX, MENU_API } from "../../utils/constants.js";

const ResMenuPage = () => {

  const fetchMenu = async () => {
  try {
    // Calls your Node backend on port 5000
    const response = await fetch("http://localhost:5000/api/menu/23678");

    // Line 12 will succeed because your backend sends real JSON!
    const json = await response.json();
    console.log("Real-time Swiggy Data via Backend:", json);

   
  } catch (error) {
    console.error("Error fetching Swiggy menu:", error);
  }
};
  
  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="Resmenu-Container">
      <h1>RES NAME</h1>
      <p>Cuisines</p>
      <p>Rating</p>
      <p>Cost for two</p>
      <p>Menu</p>
    </div>
  );
};

export default ResMenuPage;
