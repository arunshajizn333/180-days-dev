import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard.js";
import { ShimmerCard } from "./Shimmers.js";

const RestaurantSection = (props) => {
  const { restaurantList = [] } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [resList, setResList] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setResList(restaurantList);
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [restaurantList]);

  const handleFilterAll = () => {
    setActiveFilter("all");
    setResList(restaurantList);
  };

  const handleFilterRating = () => {
    setActiveFilter("rating");
    setResList(restaurantList.filter((r) => r.rating >= 4.0));
  };

  const handleFilterVeg = () => {
    setActiveFilter("veg");
    setResList(restaurantList.filter((r) => r.isVeg));
  };

  const handleFilterDelivery = () => {
    setActiveFilter("delivery");
    const sorted = [...restaurantList].sort(
      (a, b) => parseInt(a.deliveryTime, 10) - parseInt(b.deliveryTime, 10)
    );
    setResList(sorted);
  };

  const handleReload = () => {
    setIsLoading(true);
    setActiveFilter("all");
    setTimeout(() => {
      setResList(restaurantList);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="res-section">
      <div className="res-header">
        <div className="res-header-left">
          <h2 className="res-title">Popular Restaurants</h2>
          <span className="res-count-badge">
            {isLoading ? "Loading..." : `${resList.length} places`}
          </span>
        </div>

        <div className="res-header-actions">
          <button
            className="reload-shimmer-btn"
            onClick={handleReload}
            title="Reload to see Shimmer effect"
            aria-label="Reload shimmer"
          >
            ↻ Reload Shimmer
          </button>
          <a href="#all" className="see-all-link">
            See All <span>→</span>
          </a>
        </div>
      </div>

      <div className="res-filter">
        {/* All */}
        <button
          className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
          onClick={handleFilterAll}
          disabled={isLoading}
        >
          All
        </button>

        {/* Rating 4.0+ */}
        <button
          className={`filter-btn ${activeFilter === "rating" ? "active" : ""}`}
          onClick={handleFilterRating}
          disabled={isLoading}
        >
          ★ Rating 4.0+
        </button>

        {/* Pure Veg */}
        <button
          className={`filter-btn ${activeFilter === "veg" ? "active" : ""}`}
          onClick={handleFilterVeg}
          disabled={isLoading}
        >
          🌱 Pure Veg
        </button>

        {/* Delivery Time */}
        <button
          className={`filter-btn ${activeFilter === "delivery" ? "active" : ""}`}
          onClick={handleFilterDelivery}
          disabled={isLoading}
        >
          ⚡ Fast Delivery
        </button>
      </div>

      <div className="res-grid" role="region" aria-label="Restaurant list">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <ShimmerCard key={`shimmer-card-${index}`} />
          ))
        ) : resList.length === 0 ? (
          <div className="no-res-found">
            <p>No restaurants found matching this filter.</p>
            <button className="filter-btn active" onClick={handleFilterAll}>
              Show All Restaurants
            </button>
          </div>
        ) : (
          resList.map((res) => (
            <RestaurantCard key={res.id} restaurantData={res} />
          ))
        )}
      </div>
    </section>
  );
};

export default RestaurantSection;
