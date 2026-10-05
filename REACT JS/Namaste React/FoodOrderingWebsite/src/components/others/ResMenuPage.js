import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { IMAGE_URL } from "../../utils/constants.js";

// Appetizing food fallbacks if item is missing imageId
const FOOD_FALLBACKS = [
  "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=80",
];

const getFallbackImg = (id) => {
  const hash = Math.abs((id || "").toString().charCodeAt(0) || 0);
  return FOOD_FALLBACKS[hash % FOOD_FALLBACKS.length];
};

// Category icon helper to match TargetDesign Image 5
const getCategoryIcon = (name = "") => {
  const lower = name.toLowerCase();
  if (lower.includes("recommend")) return "★";
  if (lower.includes("starter") || lower.includes("appetizer") || lower.includes("snack")) return "🥣";
  if (lower.includes("soup")) return "☕";
  if (lower.includes("main") || lower.includes("curry") || lower.includes("gravy")) return "🍲";
  if (lower.includes("biryani") || lower.includes("rice") || lower.includes("pulao")) return "🍛";
  if (lower.includes("bread") || lower.includes("roti") || lower.includes("naan")) return "🥟";
  if (lower.includes("chinese") || lower.includes("noodle")) return "🍜";
  if (lower.includes("dessert") || lower.includes("sweet") || lower.includes("cake") || lower.includes("ice cream")) return "🍰";
  if (lower.includes("beverage") || lower.includes("drink") || lower.includes("juice") || lower.includes("shake")) return "🥤";
  if (lower.includes("pizza")) return "🍕";
  if (lower.includes("burger")) return "🍔";
  return "🍽️";
};

// ─── Shimmer Loading State ─────────────────────────────────────────
const MenuShimmer = () => (
  <div className="resmenu-shimmer">
    <div className="resmenu-shimmer-header">
      <div className="shimmer-logo skeleton-pulse" />
      <div className="shimmer-header-info">
        <div className="shimmer-line-lg skeleton-pulse" />
        <div className="shimmer-line-md skeleton-pulse" />
        <div className="shimmer-line-sm skeleton-pulse" />
      </div>
      <div className="shimmer-banner skeleton-pulse" />
    </div>
    <div className="resmenu-shimmer-body">
      <div className="shimmer-sidebar">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="shimmer-sidebar-item skeleton-pulse" />
        ))}
      </div>
      <div className="shimmer-menu-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="shimmer-menu-card skeleton-pulse" />
        ))}
      </div>
    </div>
  </div>
);

// ─── Veg / Non-Veg Badge (Strictly square icon like TargetDesign Image 3) ────
const VegBadge = ({ isVeg }) => (
  <span className={`veg-badge ${isVeg ? "veg" : "nonveg"}`} title={isVeg ? "Vegetarian" : "Non-Vegetarian"}>
    <span className="veg-badge-dot" />
  </span>
);

// ─── Bestseller Tag ────────────────────────────────────────────────
const BestsellerTag = ({ rating }) => {
  if (!rating || parseFloat(rating) < 4.2) return null;
  return <span className="bestseller-tag">👑 Bestseller</span>;
};

// ─── Menu Item Card (Grid - Recommended Carousel) ───────────────────
const MenuItemCard = ({ item, cartItems, onAdd, onRemove }) => {
  const { id, name, description, imageId, isVeg, price, defaultPrice, ratings } = item;
  const itemPrice = Math.round((price || defaultPrice || 22000) / 100);
  const rating = ratings?.aggregatedRating?.rating || "4.3";
  const qty = cartItems[id] || 0;
  const fallback = getFallbackImg(id);
  const imgUrl = imageId ? `${IMAGE_URL}${imageId}` : fallback;

  return (
    <div className="menu-item-card">
      <div className="menu-item-card-img-wrap">
        <img
          src={imgUrl}
          alt={name}
          className="menu-item-card-img"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallback;
          }}
        />
        <BestsellerTag rating={rating} />
        <div className="menu-item-card-veg-wrap">
          <VegBadge isVeg={!!isVeg} />
        </div>
      </div>

      <div className="menu-item-card-body">
        <h4 className="menu-item-card-name" title={name}>{name}</h4>
        <p className="menu-item-card-desc" title={description}>{description || "Rich, authentic recipe crafted with premium ingredients and chef spices."}</p>
        
        <div className="menu-item-card-footer">
          <span className="menu-item-card-price">₹{itemPrice}</span>
          {qty === 0 ? (
            <button className="add-btn" onClick={() => onAdd(item)}>
              ADD <span className="add-btn-plus">+</span>
            </button>
          ) : (
            <div className="qty-controls">
              <button className="qty-btn minus" onClick={() => onRemove(id)}>−</button>
              <span className="qty-value">{qty}</span>
              <button className="qty-btn plus" onClick={() => onAdd(item)}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Menu Item Row (2-Column Grid Card - TargetDesign Image 3) ───────
const MenuItemRow = ({ item, cartItems, onAdd, onRemove }) => {
  const { id, name, description, imageId, isVeg, price, defaultPrice } = item;
  const itemPrice = Math.round((price || defaultPrice || 20000) / 100);
  const qty = cartItems[id] || 0;
  const fallback = getFallbackImg(id);
  const imgUrl = imageId ? `${IMAGE_URL}${imageId}` : fallback;

  return (
    <div className="menu-item-row">
      <div className="menu-item-row-img-wrap">
        <img
          src={imgUrl}
          alt={name}
          className="menu-item-row-img"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallback;
          }}
        />
      </div>

      <div className="menu-item-row-info">
        <div className="menu-item-row-title-line">
          <VegBadge isVeg={!!isVeg} />
          <h4 className="menu-item-row-name" title={name}>{name}</h4>
        </div>

        <p className="menu-item-row-desc" title={description}>
          {description || "Authentic preparation made fresh with fine herbs and authentic seasoning."}
        </p>

        <span className="menu-item-row-price">₹{itemPrice}</span>
      </div>

      <div className="menu-item-row-action">
        {qty === 0 ? (
          <button className="add-btn" onClick={() => onAdd(item)}>
            ADD <span className="add-btn-plus">+</span>
          </button>
        ) : (
          <div className="qty-controls">
            <button className="qty-btn minus" onClick={() => onRemove(id)}>−</button>
            <span className="qty-value">{qty}</span>
            <button className="qty-btn plus" onClick={() => onAdd(item)}>+</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Category Section (Accordion with 2-Column Grid) ───────────────
const CategorySection = ({ title, subtitle, items, cartItems, onAdd, onRemove, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [showAll, setShowAll] = useState(false);
  const displayItems = showAll ? items : items.slice(0, 4);

  return (
    <div className="menu-category-section" id={`cat-${title.replace(/\s+/g, "-").toLowerCase()}`}>
      <div className="menu-category-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="menu-category-title-wrap">
          <h3 className="menu-category-title">
            <span className="menu-category-icon">{getCategoryIcon(title)}</span> {title}
          </h3>
          {subtitle && <p className="menu-category-subtitle">{subtitle}</p>}
        </div>

        <div className="menu-category-header-right">
          {items.length > 4 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowAll(!showAll);
              }}
              className="viewall-btn"
            >
              {showAll ? "Show less" : `View all (${items.length})`} →
            </button>
          )}
          <span className={`menu-category-chevron ${isOpen ? "open" : ""}`}>▾</span>
        </div>
      </div>

      {isOpen && (
        <div className="menu-category-items">
          {displayItems.map((item) => (
            <MenuItemRow
              key={item.id}
              item={item}
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Floating Cart Panel (TargetDesign Image 4) ────────────────────
const CartPanel = ({ cartItems, allItems, onAdd, onRemove }) => {
  const itemIds = Object.keys(cartItems).filter((id) => cartItems[id] > 0);
  const totalItems = itemIds.reduce((sum, id) => sum + cartItems[id], 0);

  if (totalItems === 0) return null;

  const cartItemDetails = itemIds
    .map((id) => {
      const item = allItems.find((i) => i.id === id);
      return item ? { ...item, qty: cartItems[id] } : null;
    })
    .filter(Boolean);

  const subtotal = cartItemDetails.reduce(
    (sum, item) => sum + Math.round((item.price || item.defaultPrice || 20000) / 100) * item.qty,
    0
  );

  return (
    <div className="cart-panel" role="region" aria-label="Order Cart">
      <div className="cart-panel-header">
        <div className="cart-panel-header-left">
          <span className="cart-panel-icon">🛒</span>
          <span className="cart-panel-count">
            {totalItems} item{totalItems > 1 ? "s" : ""}
          </span>
        </div>
        <span className="cart-panel-header-link">View Cart →</span>
      </div>

      <div className="cart-panel-body">
        {cartItemDetails.map((item) => {
          const fallback = getFallbackImg(item.id);
          const img = item.imageId ? `${IMAGE_URL}${item.imageId}` : fallback;
          const price = Math.round((item.price || item.defaultPrice || 20000) / 100);

          return (
            <div key={item.id} className="cart-panel-item">
              <img
                src={img}
                alt={item.name}
                className="cart-panel-item-thumb"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallback;
                }}
              />

              <div className="cart-panel-item-details">
                <span className="cart-panel-item-name" title={item.name}>{item.name}</span>
                <span className="cart-panel-item-price">₹{price}</span>
              </div>

              <div className="qty-controls small">
                <button className="qty-btn minus" onClick={() => onRemove(item.id)}>−</button>
                <span className="qty-value">{item.qty}</span>
                <button className="qty-btn plus" onClick={() => onAdd(item)}>+</button>
              </div>
            </div>
          );
        })}

        <div className="cart-panel-subtotal-row">
          <span className="cart-panel-subtotal-label">Subtotal</span>
          <span className="cart-panel-subtotal-value">₹{subtotal}</span>
        </div>

        <button className="cart-panel-checkout-btn">
          View Cart →
        </button>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// ─── MAIN ResMenuPage COMPONENT ────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
const ResMenuPage = () => {
  const { resId } = useParams();
  const [resInfo, setResInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("menu");
  const [activeCategory, setActiveCategory] = useState("recommended");
  const [cartItems, setCartItems] = useState({});
  const recommendedRef = useRef(null);

  const fetchMenu = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/menu/${resId}`);
      if (response.ok) {
        const json = await response.json();
        setResInfo(json?.data);
        return;
      }
    } catch (error) {
      console.log("Local proxy not reachable, using fallback Swiggy menu");
    }

    try {
      // Fallback via CORS proxy if local backend not running
      const fallbackRes = await fetch(
        `https://proxy.corsfix.com/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=${resId}`
      );
      const json = await fallbackRes.json();
      setResInfo(json?.data);
    } catch (e) {
      console.error("Failed to fetch menu:", e);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  const handleAddItem = (item) => {
    setCartItems((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prev) => {
      const newQty = (prev[itemId] || 0) - 1;
      if (newQty <= 0) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return { ...prev, [itemId]: newQty };
    });
  };

  const scrollRecommended = (direction) => {
    if (recommendedRef.current) {
      const scrollAmount = 280;
      recommendedRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!resInfo) return <MenuShimmer />;

  const restaurantInfo =
    resInfo?.cards?.[0]?.card?.card?.info ||
    resInfo?.cards?.[2]?.card?.card?.info ||
    {};

  // Extract all menu items
  let allMenuItems = [];
  const seenIds = new Set();
  const groupedCard = resInfo?.cards?.find((c) => c?.groupedCard);
  if (groupedCard) {
    const regularCards = groupedCard?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
    regularCards.forEach((card) => {
      const itemCards = card?.card?.card?.itemCards || [];
      itemCards.forEach((ic) => {
        if (ic?.card?.info && !seenIds.has(ic.card.info.id)) {
          seenIds.add(ic.card.info.id);
          allMenuItems.push(ic.card.info);
        }
      });
      const categories = card?.card?.card?.categories || [];
      categories.forEach((cat) => {
        const catItems = cat?.itemCards || [];
        catItems.forEach((ic) => {
          if (ic?.card?.info && !seenIds.has(ic.card.info.id)) {
            seenIds.add(ic.card.info.id);
            allMenuItems.push(ic.card.info);
          }
        });
      });
    });
  }

  // Group items by category
  const categoryMap = {};
  allMenuItems.forEach((item) => {
    const cat = item.category || "Main Course";
    if (!categoryMap[cat]) categoryMap[cat] = [];
    categoryMap[cat].push(item);
  });
  const categoryNames = Object.keys(categoryMap);

  // Recommended items: Guaranteed to show at least 4 items
  let recommendedItems = allMenuItems.filter((item) => {
    const r = parseFloat(item.ratings?.aggregatedRating?.rating);
    return !isNaN(r) && r >= 3.8;
  });
  if (recommendedItems.length < 4) {
    recommendedItems = allMenuItems.slice(0, 8);
  }

  const subtitleMap = {
    Starters: "Perfect way to start your meal",
    "Main Course": "Hearty meals to satisfy your cravings",
    Biryani: "Aromatic rice dishes cooked to perfection",
    "Biryani & Rice": "Aromatic rice dishes cooked to perfection",
    Rice: "Flavorful rice preparations",
    Breads: "Fresh from the tandoor",
    Desserts: "Sweet endings to your meal",
    Chinese: "Wok-tossed favorites",
    Beverages: "Refreshing drinks to complement your meal",
    Soups: "Warm, soothing bowls for the soul",
  };

  const handleCategoryClick = (catName) => {
    setActiveCategory(catName);
    const el = document.getElementById(`cat-${catName.replace(/\s+/g, "-").toLowerCase()}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const cuisineTypes = restaurantInfo?.cuisines || ["North Indian", "Mughlai", "Biryani"];

  return (
    <div className="resmenu-page">
      {/* ═══════════════ RESTAURANT HEADER BANNER ═══════════════ */}
      <div className="resmenu-header">
        <div className="resmenu-header-inner">
          <div className="resmenu-header-left">
            <div className="resmenu-logo">
              <span className="resmenu-logo-text">
                {restaurantInfo?.name?.substring(0, 2)?.toUpperCase() || "SS"}
              </span>
            </div>
            <div className="resmenu-header-info">
              <h1 className="resmenu-name">{restaurantInfo?.name || "Spice Stories"}</h1>
              <div className="resmenu-cuisine-tags">
                <span className="resmenu-cuisine-badge">Multi-Cuisine</span>
                <span className="resmenu-cuisine-text">{cuisineTypes.join(" • ")}</span>
              </div>
              <div className="resmenu-meta-row">
                <span className="resmenu-rating">
                  ★ {restaurantInfo?.avgRating || "4.4"}{" "}
                  <span className="resmenu-rating-count">
                    ({restaurantInfo?.totalRatingsString || "12.3K+"})
                  </span>
                </span>
                <span className="resmenu-meta-divider">•</span>
                <span className="resmenu-delivery-time">
                  🕒 {restaurantInfo?.sla?.slaString || "30–40 mins"}
                </span>
                <span className="resmenu-meta-divider">•</span>
                <span className="resmenu-cost">
                  ₹ {restaurantInfo?.costForTwoMessage || "₹300 for two"}
                </span>
              </div>
              <div className="resmenu-address-row">
                <span className="resmenu-address">
                  📍 {restaurantInfo?.locality || "100 Feet Road, Koramangala"},{" "}
                  {restaurantInfo?.city || "Bangalore"}
                </span>
                <span className="resmenu-open-badge">● Open now • 11:00 AM – 11:00 PM</span>
              </div>
            </div>
          </div>

          <div className="resmenu-header-right">
            <div className="resmenu-header-actions">
              <button className="resmenu-action-btn" title="Save" type="button">♡</button>
              <button className="resmenu-action-btn" title="Share" type="button">↗</button>
            </div>
            <div className="resmenu-offer-banner">
              <span className="resmenu-offer-icon">👑</span>
              <div className="resmenu-offer-text">
                <strong>FLAT 20% OFF</strong>
                <span>on orders above ₹499</span>
              </div>
              <span className="resmenu-offer-arrow">›</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ TABS ═══════════════ */}
      <div className="resmenu-tabs-wrapper">
        <div className="resmenu-tabs">
          {["menu", "reviews", "photos", "about"].map((tab) => (
            <button
              key={tab}
              className={`resmenu-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab === "menu" && "Menu"}
              {tab === "reviews" && `Reviews (${restaurantInfo?.totalRatingsString || "12.3K"})`}
              {tab === "photos" && "Photos (1.2K)"}
              {tab === "about" && "About"}
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════ MENU CONTENT ═══════════════ */}
      {activeTab === "menu" && (
        <div className="resmenu-content">
          {/* ─── Category Sidebar (TargetDesign Image 5) ─── */}
          <aside className="resmenu-sidebar">
            <button
              type="button"
              className={`resmenu-sidebar-item ${activeCategory === "recommended" ? "active" : ""}`}
              onClick={() => {
                setActiveCategory("recommended");
                const el = document.getElementById("recommended-section");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <span className="sidebar-icon">★</span>
              <span className="sidebar-label">Recommended</span>
            </button>

            {categoryNames.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`resmenu-sidebar-item ${activeCategory === cat ? "active" : ""}`}
                onClick={() => handleCategoryClick(cat)}
              >
                <span className="sidebar-icon">{getCategoryIcon(cat)}</span>
                <span className="sidebar-label" title={cat}>{cat}</span>
              </button>
            ))}
          </aside>

          {/* ─── Menu Main Area ─── */}
          <main className="resmenu-main">
            {/* ── Recommended Carousel Section ── */}
            {recommendedItems.length > 0 && (
              <section className="resmenu-recommended" id="recommended-section">
                <div className="resmenu-section-header">
                  <div>
                    <h2 className="resmenu-section-title">
                      <span className="section-emoji">🔥</span> Recommended for you
                    </h2>
                    <p className="resmenu-section-subtitle">
                      Our chef&apos;s special picks, loved by our customers
                    </p>
                  </div>
                  <div className="resmenu-carousel-controls">
                    <button
                      className="carousel-arrow"
                      onClick={() => scrollRecommended("left")}
                      type="button"
                      aria-label="Scroll left"
                    >
                      ‹
                    </button>
                    <button
                      className="carousel-arrow"
                      onClick={() => scrollRecommended("right")}
                      type="button"
                      aria-label="Scroll right"
                    >
                      ›
                    </button>
                  </div>
                </div>

                <div className="resmenu-recommended-carousel" ref={recommendedRef}>
                  {recommendedItems.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      cartItems={cartItems}
                      onAdd={handleAddItem}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* ── Category Accordions (2-Column Grid) ── */}
            {categoryNames.map((cat, idx) => (
              <CategorySection
                key={cat}
                title={cat}
                subtitle={subtitleMap[cat] || `Delicious ${cat.toLowerCase()} freshly prepared`}
                items={categoryMap[cat]}
                cartItems={cartItems}
                onAdd={handleAddItem}
                onRemove={handleRemoveItem}
                defaultOpen={idx < 4}
              />
            ))}
          </main>
        </div>
      )}

      {/* ═══════════════ FLOATING CART (TargetDesign Image 4) ═══════════════ */}
      <CartPanel
        cartItems={cartItems}
        allItems={allMenuItems}
        onAdd={handleAddItem}
        onRemove={handleRemoveItem}
      />
    </div>
  );
};

export default ResMenuPage;