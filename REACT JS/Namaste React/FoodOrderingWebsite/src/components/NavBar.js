import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "url:../assets/logo2.png";
import locationIcon from "url:../assets/location.png";
import cartIcon from "url:../assets/cart.png";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const NavBar = () => {
  const location = useLocation();
  const isOnline = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);

   const cartLength=useSelector((store)=>store.cart.items.length)

  // Get the first letter of the username for the avatar
  const avatarInitial = loggedInUser
    ? loggedInUser.charAt(0).toUpperCase()
    : "?";

  return (
    <header className="navbar-wrapper">
      <div className="navbar">
        <Link to="/" className="logo" aria-label="Foodie Home">
          <img alt="Foodie Logo" src={logo} className="logo-img" />
        </Link>

        <nav className="nav-links-container" aria-label="Main Navigation">
          <ul className="nav-links">
            <li
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            >
              <Link to="/">Home</Link>
            </li>
            <li className="nav-link">
              <Link to="/">Restaurants</Link>
            </li>
            <li
              className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}
            >
              <Link to="/contact">Contact</Link>
            </li>
            <li
              className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
            >
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          <div className="location" title="Delivery Location">
            <img
              alt="Location pin"
              src={locationIcon}
              className="location-icon"
            />
            <div className="location-info">
              <span className="location-text">Deliver to</span>
              <span className="location-details">
                Bengaluru, 560045 <span className="chevron-down">▼</span>
              </span>
            </div>
          </div>

          {/* Online Status */}
          <span
            className={`status-dot ${isOnline ? "online" : "offline"}`}
          ></span>

          {/* Profile Chip — linked to /profile */}
          <Link
            to="/profile"
            className={`
              group flex items-center gap-2.5 px-3 py-1.5 rounded-full
              border border-transparent
              transition-all duration-200 ease-in-out cursor-pointer
              hover:bg-[#fff5f0] hover:border-[#ffe0cc]
              ${location.pathname === "/profile"
                ? "bg-[#fff5f0] border-[#ffd1b3]! shadow-[0_0_0_2px_rgba(255,82,0,0.08)]"
                : ""
              }
            `}
            aria-label="Go to profile"
          >
            {/* Avatar circle with initial */}
            <div
              className={`
              relative flex items-center justify-center
              w-8 h-8 rounded-full
              bg-gradient-to-br from-[#ff5200] to-[#ff7b3a]
              text-white text-sm font-bold
              shadow-[0_2px_8px_rgba(255,82,0,0.25)]
              group-hover:shadow-[0_3px_12px_rgba(255,82,0,0.35)]
              transition-shadow duration-200
            `}
            >
              {avatarInitial}
              {/* Tiny online dot on avatar */}
              <span
                className={`
                absolute -bottom-0.5 -right-0.5
                w-3 h-3 rounded-full border-2 border-white
                ${isOnline ? "bg-emerald-400" : "bg-neutral-400"}
              `}
              ></span>
            </div>

            {/* Username + label */}
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-[10px] font-medium text-[#9ca3af] tracking-wide uppercase">
                Account
              </span>
              <span
                className={`
                text-[13px] font-bold tracking-[-0.01em] max-w-[120px] truncate
                ${location.pathname === "/profile" ? "text-[#ff5200]" : "text-[#1a1a1a]"}
                group-hover:text-[#ff5200] transition-colors duration-200
              `}
              >
                {loggedInUser}
              </span>
            </div>

            {/* Chevron */}
            <svg
              className={`
                w-3.5 h-3.5 text-[#b0b5bf]
                group-hover:text-[#ff5200] group-hover:translate-x-0.5
                transition-all duration-200 hidden sm:block
              `}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
          <Link to="/cart">
            <div className="cart" aria-label="Shopping Cart">
              <img alt="Cart" src={cartIcon} className="cart-icon" />
              <span className="cart-badge">{cartLength}</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
