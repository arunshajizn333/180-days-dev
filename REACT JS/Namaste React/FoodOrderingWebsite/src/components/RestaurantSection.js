import RestaurantCard from "./RestaurantCard.js";

const RestaurantSection = (props) => {
  const { restaurantList } = props;

  return (
    <section className="res-section">
      <div className="res-header">
        <h2 className="res-title">Popular Restaurants</h2>
        <a href="#all" className="see-all-link">
          See All <span>→</span>
        </a>
      </div>

      {/* ONE grid wrapping all cards */}
      <div className="res-grid">
        {restaurantList.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurantData={restaurant} />
        ))}
      </div>
    </section>
  );
};

export default RestaurantSection