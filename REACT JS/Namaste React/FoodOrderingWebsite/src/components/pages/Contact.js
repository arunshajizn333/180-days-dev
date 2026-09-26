import React from "react";

const Contact = () => (
  <main className="page-content contact-page">
    <section className="page-hero">
      <p className="page-eyebrow">We’re here to help</p>
      <h1>Contact us</h1>
      <p>Have a question about an order or need a hand? Get in touch.</p>
    </section>

    <section className="page-section contact-card">
      <h2>Customer support</h2>
      <p>Our team can help with orders, delivery, and your Foodie account.</p>
      <a className="contact-email" href="mailto:support@foodie.example">
        support@foodie.example
      </a>
      <p className="contact-note">For order issues, include your order number in your message.</p>
    </section>
  </main>
);

export default Contact;
