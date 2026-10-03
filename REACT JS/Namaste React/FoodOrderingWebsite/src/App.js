import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";

import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection.js";
import CategorySection from "./components/CategorySection.js";
import RestaurantSection from "./components/RestaurantSection.js";
import PromoBanner from "./components/PromoBanner.js";
import Footer from "./components/Footer.js";

import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import About from "./components/pages/About.js";
import Error from "./components/pages/Error.js";
import Contact from "./components/pages/Contact.js";
import ResMenuPage from "./components/pages/ResMenuPage.js";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategorySelect = (catId, catName) => {
    setSelectedCategory(catId);
    if (catId === "all" || catId === "more") {
      setSearchTerm("");
    } else {
      setSearchTerm(catName);
    }
  };

  return (
    <div className="home-content">
      <HeroSection setSearchTerm={setSearchTerm} />
      <CategorySection
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />
      <RestaurantSection searchTerm={searchTerm} />
      <PromoBanner />
    </div>
  );
};

const App = () => {
  return (
    <div className="app-container">
      <NavBar />
      <Outlet />
      <Footer />
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
        errorElement: <Error />
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurentMenu/:resId",
        element: <ResMenuPage />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
