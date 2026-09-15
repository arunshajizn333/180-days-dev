import React from "react";
import ReactDOM from "react-dom/client";

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
        <h1>Good Food <br/>
        Makes a <span>Great Day</span></h1>
        <h4>Discover the best restaurants near you.</h4>
        <input type="text" placeholder="Search for restaurants or dishes" className="search-input" />
        <p>Popular searches: Pizza, Burger, Pasta</p>
    </div>       
)
const CATEGORIES = [
  { id: 'all', name: 'All', icon: '⊞', bg: '#fff0e6' },
  { id: 'pizza', name: 'Pizza', icon: '🍕', bg: '#fff5f0' },
  { id: 'burger', name: 'Burger', icon: '🍔', bg: '#fffbe8' },
  { id: 'biryani', name: 'Biryani', icon: '🍛', bg: '#fff7ed' },
  { id: 'chinese', name: 'Chinese', icon: '🍜', bg: '#f5f0ff' },
  { id: 'south-indian', name: 'South Indian', icon: '🥞', bg: '#eefdf8' },
  { id: 'desserts', name: 'Desserts', icon: '🍰', bg: '#fff0f3' },
  { id: 'beverages', name: 'Beverages', icon: '🥤', bg: '#fff7ed' },
  { id: 'more', name: 'More', icon: '•••', bg: '#f3f4f6' },
];


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
)

export const RESTAURANTS = [
  {
    id: 1,
    name: "The Pizza House",
    cuisines: "Pizza, Italian",
    rating: 4.5,
    reviews: "1.2K+",
    priceForTwo: "₹ 200 for two",
    deliveryTime: "30–40 mins",
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Burger Point",
    cuisines: "Burgers, Fast Food",
    rating: 4.2,
    reviews: "980+",
    priceForTwo: "₹ 250 for two",
    deliveryTime: "25–35 mins",
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Biryani Blues",
    cuisines: "Biryani, North Indian",
    rating: 4.6,
    reviews: "2.1K+",
    priceForTwo: "₹ 300 for two",
    deliveryTime: "20–30 mins",
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Chinese Wok",
    cuisines: "Chinese, Asian",
    rating: 4.3,
    reviews: "860+",
    priceForTwo: "₹ 220 for two",
    deliveryTime: "30–45 mins",
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80",
  }
];

const RestaurantSection = () => (
  <section className="res-section">
    {/* Section Header */}
    <div className="res-header">
      <h2 className="res-title">Popular Restaurants</h2>
      <a href="#all" className="see-all-link">
        See All <span>→</span>
      </a>
    </div>
    {/* Cards Grid */}
    <div className="res-grid">
      {RESTAURANTS.map((res) => (
        <div key={res.id} className="res-card">
          {/* Card Image Wrapper */}
          <div className="res-img-container">
            <img src={res.image} alt={res.name} className="res-img" />
            {/* Favorite / Heart Button */}
            <button className="heart-btn" aria-label="Favorite">
              ♡
            </button>
            {/* Delivery Time Badge */}
            <div className="delivery-badge">
              <span className="clock-icon">🕒</span>
              <span>{res.deliveryTime}</span>
            </div>
          </div>
          {/* Restaurant Details */}
          <div className="res-info">
            <h3 className="res-name">{res.name}</h3>
            <p className="res-cuisines">{res.cuisines}</p>
            {/* Rating */}
            <div className="res-rating-row">
              <span className="star-icon">★</span>
              <span className="rating-score">{res.rating}</span>
              <span className="rating-count">({res.reviews})</span>
            </div>
            {/* Price & Free Delivery */}
            <div className="res-footer">
              <span className="price-text">{res.priceForTwo}</span>
              {res.freeDelivery && (
                <span className="free-delivery-badge">Free Delivery</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);


const OfferSection = () => (
    <div className="offer-section">


    </div>
)

const footer = () => (
    <div className="footer">
    </div>
)



const App = () => (
    <div className="app-container">
        <NavBar />
        <HeroSection />
        <CategorySection />
        <RestaurantSection />
         <OfferSection />
        <footer />
    </div>
);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
