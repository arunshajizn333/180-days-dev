import RestaurantCard from "./RestaurantCard.js";
import { ShimmerCard } from "./Shimmers.js";
import { Link } from "react-router-dom";
import useResDataApi from "../utils/useResDataApi.js";

const RestaurantSection = ({ searchTerm = "" }) => {

  const {restaurantList,resList,fetchError,isLoading}=useResDataApi();

  const filteredRestaurants = resList.filter((res) => {
    if (!searchTerm || !searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase().trim();
    const nameMatch = res?.info?.name?.toLowerCase().includes(term);
    const cuisineMatch = res?.info?.cuisines?.some((c) =>
      c.toLowerCase().includes(term)
    );
    return nameMatch || cuisineMatch;
  });

  return (
    <section className="res-section" aria-label="Popular Restaurants">
      <div className="res-header">
        <h2 className="res-title">Popular Restaurants</h2>

        <a href="#all" className="see-all-link">
          See All <span className="see-all-arrow">→</span>
        </a>
      </div>

      {fetchError && <p className="res-error">{fetchError}</p>}

      <div className="res-grid" role="region" aria-label="Restaurant list">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <ShimmerCard key={`shimmer-card-${index}`} />
          ))
        ) : filteredRestaurants.length === 0 ? (
          <div className="no-res-found">
            <p>No restaurants found matching &quot;{searchTerm}&quot;.</p>
          </div>
        ) : (
          filteredRestaurants.map((res) => (
            <Link
              to={`/restaurentMenu/${res.info.id}`}
              key={res.info.id}
              className="res-card-link"
            >
              <RestaurantCard restaurantData={res} />
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default RestaurantSection;
