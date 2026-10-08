import  { lazy,Suspense } from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";

import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection.js";
import CategorySection from "./components/CategorySection.js";
import RestaurantSection from "./components/RestaurantSection.js";
import PromoBanner from "./components/PromoBanner.js";
import Footer from "./components/Footer.js";

import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";

import Error from "./components/pages/Error.js";
import Contact from "./components/pages/Contact.js";
import ResMenuPage from "./components/pages/ResMenuPage.js";
import OfflinePage from "./components/pages/OfflinePage.js";
import useOnlineStatus from "./utils/useOnlineStatus.js";

 const About=lazy(()=>import("./components/pages/About.js"))

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

   const isOnline =useOnlineStatus();

  

  return (
    <div className="app-container">
      <NavBar />
      {isOnline ? <Outlet /> : <OfflinePage/>}
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
        element: <Suspense fallback={<h1>Loading...</h1>}><About /></Suspense> ,
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
