import React, { useEffect, useRef } from "react";
import RestaurantCard, { ResRatingCard } from "./RestaurantCard.js";
import { ShimmerCard } from "./Shimmers.js";
import { Link } from "react-router-dom";
import useResDataApi from "../utils/useResDataApi.js";

const RestaurantSection = ({ searchTerm = "" }) => {
  const {
    restaurantList,
    resList,
    fetchError,
    isLoading,
    isLoadingMore,
    loadMoreError,
    hasMore,
    loadMoreRestaurants,
    retryLoadMore,
  } = useResDataApi();

  const ResTopRatedCard = ResRatingCard(RestaurantCard);
  const observerTarget = useRef(null);

  // Keep references to latest state to avoid teardown/re-creation loops of IntersectionObserver
  const loadMoreRef = useRef(loadMoreRestaurants);
  loadMoreRef.current = loadMoreRestaurants;

  const statusRef = useRef({ hasMore, isLoadingMore, loadMoreError });
  statusRef.current = { hasMore, isLoadingMore, loadMoreError };

  const filteredRestaurants = resList.filter((res) => {
    if (!searchTerm || !searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase().trim();
    const nameMatch = res?.info?.name?.toLowerCase().includes(term);
    const cuisineMatch = res?.info?.cuisines?.some((c) =>
      c.toLowerCase().includes(term)
    );
    return nameMatch || cuisineMatch;
  });

  // Setup observer when initial restaurants finish loading
  useEffect(() => {
    if (isLoading) return;

    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const { hasMore, isLoadingMore, loadMoreError } = statusRef.current;
        if (entries[0]?.isIntersecting && hasMore && !isLoadingMore && !loadMoreError) {
          console.log("Observer intersecting: loading next batch of restaurants...");
          loadMoreRef.current();
        }
      },
      {
        rootMargin: "300px", // Trigger 300px before reaching the exact bottom
        threshold: 0.1,
      }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, [isLoading]);

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
              {res.info.avgRating >= 4.4? (
                <ResTopRatedCard restaurantData={res} />
              ) : (
                <RestaurantCard restaurantData={res} />
              )}
            </Link>
          ))
        )}
      </div>

      {/* Infinite Scroll Trigger & Loading Indicator */}
      {!isLoading && (
        <div
          ref={observerTarget}
          className="w-full py-8 flex flex-col items-center justify-center min-h-[70px]"
        >
          {isLoadingMore && (
            <div className="flex items-center gap-3 text-neutral-600 font-medium">
              <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Loading more restaurants...</span>
            </div>
          )}

          {loadMoreError && (
            <div className="flex flex-col items-center gap-2 py-2">
              <p className="text-amber-600 text-sm font-medium">{loadMoreError}</p>
              <button
                type="button"
                onClick={retryLoadMore}
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-full shadow transition-all duration-200 cursor-pointer"
              >
                Retry Loading
              </button>
            </div>
          )}

          {!hasMore && resList.length > 0 && !loadMoreError && (
            <p className="text-neutral-400 text-sm">
              🎉 You&apos;ve explored all available restaurants!
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default RestaurantSection;
