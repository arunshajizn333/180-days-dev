
import logo from "url:../assets/logo2.png";
import locationIcon from "url:../assets/location.png";
import profileIcon from "url:../assets/profile.png";
import cartIcon from "url:../assets/cart.png";


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

export default NavBar;
