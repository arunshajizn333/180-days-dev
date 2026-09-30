import { useState } from "react";

const POPULAR_SEARCHES = ["Biryani", "Pizza", "Burger", "Chinese", "South Indian"];

const HeroSection = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (term) => {
    const val = term !== undefined ? term : inputValue;
    setSearchTerm(val);
  };

  const handlePillClick = (term) => {
    setInputValue(term);
    setSearchTerm(term);
  };

  return (
    <div className="hero-section">
      <p className="hero-eyebrow">Delicious Food, Delivered</p>
      <h1 className="hero-title">
        Good Food <br />
        Makes a <span>Great Day</span>
      </h1>
      <h4 className="hero-subtitle">Discover the best restaurants near you.</h4>

      <div className="hero-search-wrapper">
        <span className="hero-search-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search for dishes, restaurants or cuisines..."
          className="search-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          className="hero-search-btn"
          onClick={() => handleSearch()}
          aria-label="Search restaurants or cuisines"
        >
          Search
        </button>
      </div>

      <div className="hero-popular-searches">
        <span className="popular-label">Popular searches:</span>
        {POPULAR_SEARCHES.map((item) => (
          <button
            key={item}
            type="button"
            className="popular-pill"
            onClick={() => handlePillClick(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
