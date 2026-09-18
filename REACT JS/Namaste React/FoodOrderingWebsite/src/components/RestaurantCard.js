import { useState } from "react";
import { ShimmerCard } from "./Shimmers.js";

const RestaurantCard = (props) => {
  const { restaurantData, isLoading } = props;
  const [isFavorite, setIsFavorite] = useState(false);

  if (isLoading || !restaurantData) {
    return <ShimmerCard />;
  }

  const {
    name,
    cuisines,
    rating,
    reviews,
    priceForTwo,
    deliveryTime,
    freeDelivery,
    image,
  } = restaurantData;

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="res-card">
      <div className="res-img-container">
        <img src={image} alt={name} className="res-img" loading="lazy" />
        <button
          className={`heart-btn ${isFavorite ? "favorited" : ""}`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? "❤️" : "♡"}
        </button>

        <div className="delivery-badge">
          <span className="clock-icon">🕒</span>
          <span>{deliveryTime}</span>
        </div>
      </div>

      <div className="res-info">
        <h3 className="res-name" title={name}>{name}</h3>
        <p className="res-cuisines" title={cuisines}>{cuisines}</p>
        <div className="res-rating-row">
          <span className="star-icon">★</span>
          <span className="rating-score">{rating}</span>
          <span className="rating-count">({reviews})</span>
        </div>
        <div className="res-footer">
          <span className="price-text">{priceForTwo}</span>
          {freeDelivery && (
            <span className="free-delivery-badge">Free Delivery</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;