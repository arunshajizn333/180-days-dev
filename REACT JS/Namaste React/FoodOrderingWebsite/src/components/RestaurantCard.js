import { useState } from "react";
import { ShimmerCard } from "./Shimmers.js";
import { IMAGE_URL } from "../utils/constants.js";

// High quality fallback images in case Swiggy CDN is blocked or missing imageId
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
];

const RestaurantCard = ({ restaurantData, isLoading }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  if (isLoading || !restaurantData?.info) {
    return <ShimmerCard />;
  }

  const {
    name,
    cuisines,
    avgRating,
    avgRatingString,
    totalRatingsString,
    costForTwo,
    sla,
    aggregatedDiscountInfoV3,
    cloudinaryImageId,
    id,
  } = restaurantData.info;

  // Format rating
  const rating = avgRatingString || avgRating || "4.2";
  const reviews = totalRatingsString || "1.0K+";

  // Format delivery time pill (e.g., "30–40 mins")
  const rawDelivery = sla?.slaString || (sla?.deliveryTime ? `${sla.deliveryTime} mins` : "25–35 mins");
  const deliveryLabel = rawDelivery.replace("MINS", "mins").replace("MIN", "mins").replace("-", "–");

  // Format price for two (e.g., "₹ 200 for two")
  let formattedPrice = costForTwo || "₹ 250 for two";
  if (!formattedPrice.includes("₹")) {
    formattedPrice = `₹ ${formattedPrice}`;
  } else if (!formattedPrice.startsWith("₹ ")) {
    formattedPrice = formattedPrice.replace("₹", "₹ ");
  }

  // Format free delivery / discount badge
  const discountMsg = aggregatedDiscountInfoV3?.discountCalloutInfo?.message;
  const deliveryBadge = discountMsg || "Free Delivery";

  // Cuisine list
  const cuisineList = Array.isArray(cuisines) ? cuisines.slice(0, 3).join(", ") : (cuisines || "Fast Food, Cafe");

  // Image source with fallback
  const fallbackImg = FALLBACK_IMAGES[Math.abs((id || name || "").charCodeAt(0) || 0) % FALLBACK_IMAGES.length];
  const imageSrc = cloudinaryImageId ? `${IMAGE_URL}${cloudinaryImageId}` : fallbackImg;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="res-card">
      <div className="res-img-container">
        <img
          src={imageSrc}
          alt={name}
          className="res-img"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImg;
          }}
        />

        <button
          type="button"
          className={`heart-btn ${isFavorite ? "favorited" : ""}`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#ff385c" stroke="#ff385c" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          )}
        </button>

        <div className="delivery-badge">
          <span className="clock-icon">🕒</span>
          <span>{deliveryLabel}</span>
        </div>
      </div>

      <div className="res-info">
        <h3 className="res-name" title={name}>{name}</h3>
        <p className="res-cuisines" title={cuisineList}>{cuisineList}</p>
        
        <div className="res-rating-row">
          <span className="star-icon">★</span>
          <span className="rating-score">{rating}</span>
          <span className="rating-count">({reviews})</span>
        </div>

        <div className="res-footer">
          <span className="price-text">{formattedPrice}</span>
          <span className="free-delivery-badge">{deliveryBadge}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
