import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard.js";
import { ShimmerCard } from "./Shimmers.js";

const RestaurantSection = () => {
  const [restaurantList, setRestaurantList] = useState([]);

  const [resList, setResList] = useState(restaurantList);


  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [fetchError, setFetchError] = useState("");


const fetchdata = async () => {
  const data = await fetch(
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  );

  const json = await data.json();

  console.log(
    json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
  );

  setRestaurantList(
    json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
  );
};


  useEffect(() => {
    fetchdata();
  }, []);

  const handleFilterAll = () => {
    setActiveFilter("all");
    setFetchError("");
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
        {fetchError && <p className="res-error">{fetchError}</p>}

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
            <RestaurantCard key={res.info.id} restaurantData={res} />
          ))
        )}
      </div>
    </section>
  );
};

export default RestaurantSection;
