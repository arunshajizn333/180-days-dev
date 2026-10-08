import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "url:../assets/logo2.png";
import locationIcon from "url:../assets/location.png";
import profileIcon from "url:../assets/profile.png";
import cartIcon from "url:../assets/cart.png";
import exitIcon from "url:../assets/exit.png";
import useOnlineStatus from "../utils/useOnlineStatus";

const NavBar = () => {
  const location = useLocation();
  const isOnline=useOnlineStatus()

  const LoginObj = {
    btName: "Login / Sign Up",
    iconLink: profileIcon,
  };

  const LogoutObj = {
    btName: "Logout",
    iconLink: exitIcon,
  };

  const [btnName, setBtnName] = useState(LoginObj);

  return (
    <header className="navbar-wrapper">
      <div className="navbar">
        <Link to="/" className="logo" aria-label="Foodie Home">
          <img alt="Foodie Logo" src={logo} className="logo-img" />
        </Link>

        <nav className="nav-links-container" aria-label="Main Navigation">
          <ul className="nav-links">
           
            <li className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
              <Link to="/">Home</Link>
            </li>
            <li className="nav-link">
              <Link to="/">Restaurants</Link>
            </li>
            <li className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}>
              <Link to="/contact">Contact</Link>
            </li>
            <li className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          <div className="location" title="Delivery Location">
            <img alt="Location pin" src={locationIcon} className="location-icon" />
            <div className="location-info">
              <span className="location-text">Deliver to</span>
              <span className="location-details">
                Bengaluru, 560045 <span className="chevron-down">▼</span>
              </span>
            </div>
          </div>

          <div
            className="profile"
            onClick={() =>
              btnName.btName === "Login / Sign Up"
                ? setBtnName(LogoutObj)
                : setBtnName(LoginObj)
            }
          >
            <img
              alt="Profile"
              src={btnName.iconLink}
              className="profile-img"
            />
            <button className="profile-btn" type="button">
              {btnName.btName}
            </button>
          </div>
           <span className={`status-dot ${isOnline ? "online" : "offline"}`}></span>

          <div className="cart" aria-label="Shopping Cart">
            <img alt="Cart" src={cartIcon} className="cart-icon" />
            <span className="cart-badge">0</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
