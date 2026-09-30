import React from "react";

const About = () => (
  <main className="page-content about-page">
    <section className="page-hero">
      <p className="page-eyebrow">About Foodie</p>
      <h1>Good food brings us together.</h1>
      <p>
        We make it easy to discover great local restaurants and enjoy the food
        you love, delivered fast and fresh right to your door.
      </p>
    </section>

    <section className="page-section">
      <h2>Our story</h2>
      <p>
        Foodie connects hungry people with the kitchens and neighbourhood
        favourites that make every meal special. Browse nearby restaurants,
        find something new, and let us take care of getting it to you.
      </p>

      <div className="about-stats">
        <div className="about-stat-card">
          <span className="stat-number">500+</span>
          <span className="stat-label">Partner Restaurants</span>
        </div>
        <div className="about-stat-card">
          <span className="stat-number">30 Mins</span>
          <span className="stat-label">Average Delivery Time</span>
        </div>
        <div className="about-stat-card">
          <span className="stat-number">100K+</span>
          <span className="stat-label">Happy Food Lovers</span>
        </div>
      </div>
    </section>
  </main>
);

export default About;
