import React from "react";

const About = () => (
  <main
    style={{
      width: "min(100% - 48px, 980px)",
      margin: "0 auto",
      padding: "56px 0 96px",
    }}
  >
    {/* Page Hero */}
    <section
      style={{
        padding: "56px 48px",
        background: "#ffffff",
        border: "1px solid #eceef2",
        borderRadius: "24px",
        boxShadow: "0 12px 36px rgba(24, 28, 36, 0.04)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <p
        style={{
          marginBottom: "14px",
          color: "#ff5200",
          fontSize: "13px",
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        About Foodie
      </p>
      <h1
        style={{
          maxWidth: "680px",
          marginBottom: "16px",
          fontSize: "clamp(32px, 5vw, 48px)",
          lineHeight: 1.15,
          letterSpacing: "-0.04em",
          color: "#1a1a1a",
          fontWeight: 800,
        }}
      >
        Good food brings us together.
      </h1>
      <p
        style={{
          maxWidth: "680px",
          color: "#727782",
          fontSize: "16px",
          lineHeight: 1.8,
        }}
      >
        We make it easy to discover great local restaurants and enjoy the food
        you love, delivered fast and fresh right to your door.
      </p>

      {/* Decorative emoji — replaces .page-hero::after */}
      <span
        style={{
          position: "absolute",
          right: "40px",
          bottom: "30px",
          fontSize: "110px",
          opacity: 0.12,
          pointerEvents: "none",
          userSelect: "none",
        }}
        aria-hidden="true"
      >
        🍲
      </span>
    </section>

    {/* Our Story Section */}
    <section
      style={{
        marginTop: "28px",
        padding: "40px 48px",
        background: "#ffffff",
        border: "1px solid #eceef2",
        borderRadius: "20px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.02)",
      }}
    >
      <h2
        style={{
          marginBottom: "14px",
          fontSize: "26px",
          fontWeight: 800,
          color: "#1a1a1a",
          letterSpacing: "-0.4px",
        }}
      >
        Our story
      </h2>
      <p
        style={{
          maxWidth: "680px",
          color: "#727782",
          fontSize: "16px",
          lineHeight: 1.8,
        }}
      >
        Foodie connects hungry people with the kitchens and neighbourhood
        favourites that make every meal special. Browse nearby restaurants,
        find something new, and let us take care of getting it to you.
      </p>

      {/* Stats Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "28px",
        }}
      >
        <div
          style={{
            background: "#fdfaf7",
            border: "1px solid #f3ebe1",
            padding: "24px",
            borderRadius: "16px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "32px",
              fontWeight: 800,
              color: "#ff5200",
            }}
          >
            500+
          </span>
          <span
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: 600,
              color: "#4b515d",
              marginTop: "4px",
            }}
          >
            Partner Restaurants
          </span>
        </div>

        <div
          style={{
            background: "#fdfaf7",
            border: "1px solid #f3ebe1",
            padding: "24px",
            borderRadius: "16px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "32px",
              fontWeight: 800,
              color: "#ff5200",
            }}
          >
            30 Mins
          </span>
          <span
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: 600,
              color: "#4b515d",
              marginTop: "4px",
            }}
          >
            Average Delivery Time
          </span>
        </div>

        <div
          style={{
            background: "#fdfaf7",
            border: "1px solid #f3ebe1",
            padding: "24px",
            borderRadius: "16px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "32px",
              fontWeight: 800,
              color: "#ff5200",
            }}
          >
            100K+
          </span>
          <span
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: 600,
              color: "#4b515d",
              marginTop: "4px",
            }}
          >
            Happy Food Lovers
          </span>
        </div>
      </div>
    </section>
  </main>
);

export default About;
