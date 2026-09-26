import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";

import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection.js";
import CategorySection from "./components/CategorySection.js";
import RestaurantSection from "./components/RestaurantSection.js";

import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import About from "./components/pages/About.js";
import Error from "./components/pages/Error.js";
import Contact from "./components/pages/Contact.js";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="app-container">
      <HeroSection  setSearchTerm={setSearchTerm} />
      <CategorySection />
      <RestaurantSection searchTerm={searchTerm} />
    </div>
  );
};

const App = () => {
  return (
    <div className="app-container">
      <NavBar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
