import RestaurantCard from "./RestaurantCard.js";
import { useState } from "react";

const RestaurantSection = (props) => {
  const { restaurantList } = props;

  const [resList, setResList] = useState(restaurantList);

  return (
    <section className="res-section">
      <div className="res-header">
        <h2 className="res-title">Popular Restaurants</h2>

        <a href="#all" className="see-all-link">
          See All <span>→</span>
        </a>
      </div>

      <div className="res-filter">
        {/* All */}
        <button
          className="filter-btn"
          onClick={() => setResList(restaurantList)}
        >
          All
        </button>

        {/* Rating 4.0+ */}
        <button
          className="filter-btn"
          onClick={() =>
            setResList(
              restaurantList.filter((r) => r.rating >= 4.0)
            )
          }
        >
          Rating 4.0+
        </button>

        {/* Pure Veg */}
        <button
          className="filter-btn"
          onClick={() =>
            setResList(
              restaurantList.filter((r) => r.isVeg)
            )
          }
        >
          Pure Veg
        </button>

        {/* Delivery Time */}
        <button
          className="filter-btn"
          onClick={() =>
            setResList(
              [...restaurantList].sort(
                (a, b) => a.deliveryTime - b.deliveryTime
              )
            )
          }
        >
          Delivery Time
        </button>
      </div>

      <div className="res-grid">
        {resList.map((res) => (
          <RestaurantCard
            key={res.id}
            restaurantData={res}
          />
        ))}
      </div>
    </section>
  );
};

export default RestaurantSection;