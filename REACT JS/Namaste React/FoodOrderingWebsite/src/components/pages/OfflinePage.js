const OfflinePage = () => {
  return (
    <div className="offline-page">
      <div className="offline-content">
        <span className="offline-icon">📡</span>
        <h1>You're Offline</h1>
        <p>Please check your internet connection and try again.</p>
        <button className="retry-btn" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    </div>
  );
};

export default OfflinePage;