export const ShimmerCard = () => {
  return (
    <div className="shimmer-card" aria-hidden="true">
      <div className="shimmer-img-container">
        <div className="shimmer-img skeleton-pulse"></div>
        <div className="shimmer-heart-btn skeleton-pulse"></div>
        <div className="shimmer-delivery-badge skeleton-pulse"></div>
      </div>

      <div className="shimmer-info">
        <div className="shimmer-title skeleton-pulse"></div>
        <div className="shimmer-cuisine skeleton-pulse"></div>
        
        <div className="shimmer-rating-row">
          <div className="shimmer-rating-pill skeleton-pulse"></div>
          <div className="shimmer-rating-count skeleton-pulse"></div>
        </div>

        <div className="shimmer-footer">
          <div className="shimmer-price skeleton-pulse"></div>
          <div className="shimmer-badge skeleton-pulse"></div>
        </div>
      </div>
    </div>
  );
};

const Shimmers = ({ count = 8 }) => {
  return (
    <div
      className="shimmer-wrapper"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading restaurants"
    >
      {Array.from({ length: count }).map((_, index) => (
        <ShimmerCard key={`shimmer-${index}`} />
      ))}
    </div>
  );
};

export default Shimmers;