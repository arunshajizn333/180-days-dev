import React from "react";

const Contact = () => (
  <main className="page-content contact-page">
    <section className="page-hero">
      <p className="page-eyebrow">We’re here to help</p>
      <h1>Contact us</h1>
      <p>Have a question about an order, restaurant partnership, or need a hand? We’re always ready to help.</p>
    </section>

    <section className="page-section contact-card">
      <h2>Customer support</h2>
      <p>Our team is available 24/7 to help with orders, delivery status, and your Foodie account.</p>
      
      <a className="contact-email" href="mailto:support@foodie.com">
        ✉ support@foodie.com
      </a>
      
      <p className="contact-note">For ongoing order issues, please include your Order ID in your message for faster resolution.</p>

      <div className="contact-channels">
        <div className="channel-card">
          <span className="channel-icon">⚡</span>
          <span className="channel-title">Fast Support</span>
          <span className="channel-desc">Average response time is under 15 minutes during peak hours.</span>
        </div>
        <div className="channel-card">
          <span className="channel-icon">🛵</span>
          <span className="channel-title">Live Tracking</span>
          <span className="channel-desc">Track your delivery partner live from the restaurant to your door.</span>
        </div>
        <div className="channel-card">
          <span className="channel-icon">🛡️</span>
          <span className="channel-title">Refund Protection</span>
          <span className="channel-desc">Instant refunds for cancelled items or delivery issues directly to your source.</span>
        </div>
      </div>
    </section>
  </main>
);

export default Contact;
