import React from "react";
import { Link } from "react-router-dom";
import logo from "url:../assets/logo2.png";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        {/* Brand & Socials */}
        <div className="footer-brand">
          <div className="footer-brand-logo">
            <img src={logo} alt="Foodie Logo" className="logo-img" />
          </div>
          <div className="footer-socials">
            <span className="social-circle-btn" aria-label="Facebook">f</span>
            <span className="social-circle-btn" aria-label="Instagram">📸</span>
            <span className="social-circle-btn" aria-label="X Twitter">𝕏</span>
            <span className="social-circle-btn" aria-label="YouTube">▶</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-col-links">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/" className="footer-link">Restaurants</Link></li>
            <li><span className="footer-link">Offers</span></li>
            <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
          </ul>
        </div>

        {/* Help */}
        <div className="footer-col">
          <h4 className="footer-col-title">Help</h4>
          <ul className="footer-col-links">
            <li><span className="footer-link">FAQ</span></li>
            <li><span className="footer-link">Track Order</span></li>
            <li><span className="footer-link">Returns & Refunds</span></li>
            <li><span className="footer-link">Support</span></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-col">
          <h4 className="footer-col-title">Legal</h4>
          <ul className="footer-col-links">
            <li><span className="footer-link">Terms & Conditions</span></li>
            <li><span className="footer-link">Privacy Policy</span></li>
            <li><span className="footer-link">Cookie Policy</span></li>
          </ul>
        </div>

        {/* Download App */}
        <div className="footer-col">
          <h4 className="footer-col-title">Download Our App</h4>
          <div className="footer-apps">
            <div className="app-badge-btn" role="button" tabIndex={0}>
              <span className="app-badge-icon"></span>
              <div className="app-badge-text">
                <span className="app-badge-sub">Download on the</span>
                <span className="app-badge-main">App Store</span>
              </div>
            </div>
            <div className="app-badge-btn" role="button" tabIndex={0}>
              <span className="app-badge-icon">▶</span>
              <div className="app-badge-text">
                <span className="app-badge-sub">GET IT ON</span>
                <span className="app-badge-main">Google Play</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>© 2024 Foodie. All rights reserved.</span>
          <span>Made with <span className="footer-heart">❤</span> for food lovers</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
