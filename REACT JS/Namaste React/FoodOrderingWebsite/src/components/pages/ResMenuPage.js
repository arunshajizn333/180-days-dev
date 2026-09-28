import { useEffect, useState } from "react";
import { CORS_FIX, MENU_API } from "../../utils/constants.js";

const ResMenuPage = () => {
  const menuData = async () => {
    try {
      const response = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=23678&catalog_qa=undefined&submitAction=ENTER");
      const body = await response.text();
      console.log("Status:", response.status);
      console.log("Content-Type:", response.headers.get("content-type"));
      console.log("Body:", body);
    } catch (error) {
      console.log("Original error:", error.name, error.message);
    }
  };

  useEffect(() => {
    menuData();
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
