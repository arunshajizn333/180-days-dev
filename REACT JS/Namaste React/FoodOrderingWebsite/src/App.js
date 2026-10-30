import { lazy, Suspense, useEffect } from "react";
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
import AccordianResPage from "./components/Learn/AccordianResPage.js";
import Profile from "./components/pages/Profile.js";
import { Provider } from "react-redux";

import UserContext from "./utils/UserContext.js";
import appStore from "./utils/appStore.js";
import Cart from "./components/pages/Cart.js";

const About = lazy(() => import("./components/pages/About.js"));

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
  const [userName, setUserName] = useState("Arun");

  const isOnline = useOnlineStatus();


  return (
    <Provider store={appStore} >
    <UserContext.Provider value={{ loggedInUser : userName, setUserName }}>
      <div className="app-container">
        <NavBar />
        {isOnline ? <Outlet /> : <OfflinePage />}
        <Footer />
      </div>
    </UserContext.Provider>
    </Provider>
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
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <About />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurentMenu/:resId",
        element: <ResMenuPage />,
      },
      {
        path: "/profile/",
        element: <Profile />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
