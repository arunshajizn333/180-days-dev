import React from "react";
import ReactDOM from "react-dom/client";

import { CATEGORIES, RESTAURANTS } from "./datas.js";

import logo from "url:./assets/logo2.png";
import locationIcon from "url:./assets/location.png";
import profileIcon from "url:./assets/profile.png";
import cartIcon from "url:./assets/cart.png";

const NavBar = () => (
  <header className="navbar-wrapper">
    <div className="navbar">
      <div className="logo">
        <img alt="Foodie Logo" src={logo} className="logo-img" />
      </div>

      <nav className="nav-links-container">
        <ul className="nav-links">
          <li className="nav-link active">Home</li>
          <li className="nav-link">Restaurants</li>
          <li className="nav-link">Offers</li>
          <li className="nav-link">About</li>
        </ul>
      </nav>

      <div className="nav-actions">
        <div className="location">
          <img alt="Location" src={locationIcon} className="location-icon" />
          <div className="location-info">
            <span className="location-text">Deliver to</span>
            <span className="location-details">
              Bengaluru, 560045 <span className="chevron-down">▼</span>
            </span>
          </div>
        </div>

        <div className="profile">
          <img alt="Profile" src={profileIcon} className="profile-img" />
          <h4 className="profile-heading">Login / Sign Up</h4>
        </div>

        <div className="cart">
          <img alt="Cart" src={cartIcon} className="cart-icon" />
          <span className="cart-badge">0</span>
        </div>
      </div>
    </div>
  </header>
);

const HeroSection = () => (
  <div className="hero-section">
    <p>Delicious Food, Delivered</p>
    <h1>
      Good Food <br />
      Makes a <span>Great Day</span>
    </h1>
    <h4>Discover the best restaurants near you.</h4>
    <input
      type="text"
      placeholder="Search for restaurants or dishes"
      className="search-input"
    />
    <p>Popular searches: Pizza, Burger, Pasta</p>
  </div>
);

const CategorySection = () => (
  <div className="category-section">
    <div className="category-list">
      {CATEGORIES.map((cat, index) => (
        <label key={cat.id} className="category-item">
          <input
            type="radio"
            name="food-category"
            defaultChecked={index === 0}
            className="category-radio"
          />
          <div className="category-circle" style={{ backgroundColor: cat.bg }}>
            <span className="category-icon">{cat.icon}</span>
          </div>
          <span className="category-name">{cat.name}</span>
          <div className="category-indicator"></div>
        </label>
      ))}
    </div>
  </div>
);

// 1. Single Card: receives 1 restaurant via props
const RestaurantCard = (props) => {
  const { restaurantData } = props;
  const {
    name,
    cuisines,
    rating,
    reviews,
    priceForTwo,
    deliveryTime,
    freeDelivery,
    image,
  } = restaurantData;

  return (
    <div className="res-card">
      <div className="res-img-container">
        <img src={image} alt={name} className="res-img" />
        <button className="heart-btn" aria-label="Favorite">♡</button>

        <div className="delivery-badge">
          <span className="clock-icon">🕒</span>
          <span>{deliveryTime}</span>
        </div>
      </div>

      <div className="res-info">
        <h3 className="res-name">{name}</h3>
        <p className="res-cuisines">{cuisines}</p>
        <div className="res-rating-row">
          <span className="star-icon">★</span>
          <span className="rating-score">{rating}</span>
          <span className="rating-count">({reviews})</span>
        </div>
        <div className="res-footer">
          <span className="price-text">{priceForTwo}</span>
          {freeDelivery && (
            <span className="free-delivery-badge">Free Delivery</span>
          )}
        </div>
      </div>
    </div>
  );
};

// 2. Section: receives the whole array via props
const RestaurantSection = (props) => {
  const { restaurantList } = props;

  return (
    <section className="res-section">
      <div className="res-header">
        <h2 className="res-title">Popular Restaurants</h2>
        <a href="#all" className="see-all-link">
          See All <span>→</span>
        </a>
      </div>

      {/* ONE grid wrapping all cards */}
      <div className="res-grid">
        {restaurantList.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurantData={restaurant} />
        ))}
      </div>
    </section>
  );
};

// 3. App passes RESTAURANTS via props
const App = () => (
  <div className="app-container">
    <NavBar />
    <HeroSection />
    <CategorySection />
    <RestaurantSection restaurantList={RESTAURANTS} />
  </div>
);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
