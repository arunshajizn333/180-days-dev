const RestaurantCard = (props) => {
  const { restaurantData } = props;
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

  return (
    <div className="res-card">
      <div className="res-img-container">
        <img src={image} alt={name} className="res-img" />
        <button className="heart-btn" aria-label="Favorite">♡</button>

        <div className="delivery-badge">
          <span className="clock-icon">🕒</span>
          <span>{deliveryTime}</span>
        </div>
      </div>

      <div className="res-info">
        <h3 className="res-name">{name}</h3>
        <p className="res-cuisines">{cuisines}</p>
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

export default RestaurantCard