import React from "react";

const PromoBanner = () => {
  return (
    <section className="promo-banner" aria-label="Special promotion">
      <div className="promo-banner-inner">
        <div className="promo-left">
          <div className="promo-gift-icon" aria-hidden="true">🎁</div>
          <div className="promo-text">
            <h3 className="promo-title">
              Get up to <span className="highlight">50% OFF</span> on your first order!
            </h3>
            <p className="promo-subtitle">Use code FOODIE50</p>
          </div>
        </div>

        <div className="promo-right">
          <button className="promo-order-btn" type="button">
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
