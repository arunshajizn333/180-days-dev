import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard.js";
import { ShimmerCard } from "./Shimmers.js";
import { CORS_FIX, ResApiCards } from "../utils/constants.js";
import { Link } from "react-router-dom";

const RestaurantSection = ({ searchTerm = "" }) => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [resList, setResList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const fetchdata = async () => {
    const shimmerStartedAt = Date.now();
    const minimumShimmerDuration = 350;

    setIsLoading(true);
    setFetchError("");

    try {
      const response = await fetch(CORS_FIX + ResApiCards);

      if (!response.ok) {
        throw new Error("Unable to load restaurants.");
      }

      const json = await response.json();
      const restaurants =
        json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        json?.data?.cards?.[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        [];

      setRestaurantList(restaurants);
      setResList(restaurants);
    } catch (error) {
      setFetchError(error.message);
    } finally {
      const elapsed = Date.now() - shimmerStartedAt;
      const remainingShimmerTime = Math.max(0, minimumShimmerDuration - elapsed);

      await new Promise((resolve) => setTimeout(resolve, remainingShimmerTime));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

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
