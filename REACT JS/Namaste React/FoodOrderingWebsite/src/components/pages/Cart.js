import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../utils/constants";
import {
  clearCart,
  incrementItem,
  decrementItem,
  removeItemById,
} from "../../utils/Redux/cartSlice";
import { useState } from "react";

// ─── Fallback images for items missing imageId ──────────
const FOOD_FALLBACKS = [
  "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80",
];

const getFallbackImg = (id) => {
  const hash = Math.abs((id || "").toString().charCodeAt(0) || 0);
  return FOOD_FALLBACKS[hash % FOOD_FALLBACKS.length];
};

// ─── Veg / Non-Veg Indicator ────────────────────────────
const VegIcon = ({ isVeg }) => (
  <span className={`cart-veg-icon ${isVeg ? "veg" : "nonveg"}`}>
    <span className="cart-veg-icon-dot" />
  </span>
);

// ─── Trash Icon SVG ─────────────────────────────────────
const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

// ─── Check Icon SVG ─────────────────────────────────────
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── Shield Check Icon SVG ──────────────────────────────
const ShieldCheck = () => (
  <svg className="cart-safe-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11.5 14.5 15.5 9.5" />
  </svg>
);

// ─── Coupon / Offer Icon SVG ────────────────────────────
const CouponIcon = () => (
  <svg className="cart-coupon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12V8H4v4a2 2 0 1 1 0 4v4h16v-4a2 2 0 1 1 0-4z" />
    <line x1="10" y1="8" x2="10" y2="20" strokeDasharray="2 2" />
  </svg>
);

// ─── Location Pin SVG ───────────────────────────────────
const LocationPin = () => (
  <svg className="cart-delivery-pin" viewBox="0 0 24 24" fill="var(--primary)" stroke="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
//  CART PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════
const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [cookingInstructions, setCookingInstructions] = useState("");

  // ── Calculate bill details ──
  const itemTotal = cartItems.reduce((sum, item) => {
    const price = Math.round((item.price || item.defaultPrice || 20000) / 100);
    return sum + price * (item.qty || 1);
  }, 0);

  const totalQty = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);
  const deliveryFee = cartItems.length > 0 ? 25 : 0;
  const platformFee = cartItems.length > 0 ? 5 : 0;
  const discount = cartItems.length > 0 ? Math.round(itemTotal * 0.07) : 0; // ~7% discount
  const grandTotal = itemTotal + deliveryFee + platformFee - discount;

  // ── Empty Cart ──
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Cart</span>
        </div>
        

        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2 className="cart-empty-title">Your cart is empty</h2>
          <p className="cart-empty-subtitle">
            You can go to the home page to view more restaurants and add
            something to your cart.
          </p>
          <Link to="/" className="cart-empty-btn">
            Browse Restaurants <span>→</span>
          </Link>
        </div>
      </div>
    );
  }

  // Restaurant name from the first cart item (placeholder logic)
  const restaurantName = "Spice Stories";
  const restaurantAddress = "Koramangala, Bengaluru";

  return (
    <div className="cart-page">
      {/* ── Breadcrumb ── */}
      <div className="cart-breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Cart</span>
      </div>

      <h1 className="cart-page-title">Your Cart</h1>
      <p className="cart-page-subtitle">Review your order before checkout</p>

      {/* ── Main Grid Layout ── */}
      <div className="cart-layout">
        {/* ════════ LEFT COLUMN ════════ */}
        <div className="cart-left">
          {/* ── Restaurant Card ── */}
          <div className="cart-restaurant-card">
            <div className="cart-restaurant-header">
              <div className="cart-restaurant-info">
                <div className="cart-restaurant-logo">
                  {restaurantName.split(" ").map((w) => w[0]).join("\n")}
                </div>
                <div>
                  <div className="cart-restaurant-name">{restaurantName}</div>
                  <div className="cart-restaurant-address">
                    <span className="pin-icon">📍</span>
                    {restaurantAddress}
                  </div>
                </div>
              </div>
              <Link to="/" className="cart-add-more-link">
                Add more items <span>→</span>
              </Link>
            </div>

            {/* ── Cart Items ── */}
            <div className="cart-items-list">
              {cartItems.map((item) => {
                const id = item.id;
                const price = Math.round(
                  (item.price || item.defaultPrice || 20000) / 100
                );
                const fallback = getFallbackImg(id);
                const imgUrl = item.imageId
                  ? `${IMAGE_URL}${item.imageId}`
                  : fallback;
                const isVeg =
                  item.isVeg ||
                  item.itemAttribute?.vegClassifier === "VEG";

                return (
                  <div className="cart-item-row" key={id}>
                    <img
                      src={imgUrl}
                      alt={item.name}
                      className="cart-item-thumb"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallback;
                      }}
                    />

                    <div className="cart-item-details">
                      <div className="cart-item-title-row">
                        <VegIcon isVeg={!!isVeg} />
                        <span className="cart-item-name">{item.name}</span>
                      </div>
                      {item.description && (
                        <p className="cart-item-desc">{item.description}</p>
                      )}
                      <span className="cart-item-price">₹{price}</span>
                    </div>

                    {/* Quantity controls */}
                    <div className="cart-qty-controls">
                      <button
                        className="cart-qty-btn"
                        onClick={() => dispatch(decrementItem(id))}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="cart-qty-value">{item.qty || 1}</span>
                      <button
                        className="cart-qty-btn"
                        onClick={() => dispatch(incrementItem(id))}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      className="cart-delete-btn"
                      onClick={() => dispatch(removeItemById(id))}
                      aria-label={`Remove ${item.name}`}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Add more items bottom */}
            <Link to="/" className="cart-add-more-bottom">
              <span className="plus-icon">+</span> Add more items
            </Link>
          </div>

          {/* ── Cooking Instructions ── */}
          <div className="cart-cooking-instructions">
            <div className="cart-cooking-header">
              <div className="cart-cooking-icon">📝</div>
              <div className="cart-cooking-title">
                Cooking instructions <span>(optional)</span>
              </div>
            </div>
            <textarea
              className="cart-cooking-input"
              rows="2"
              placeholder="Any special requests? (e.g. less spicy, no onions, extra sauce...)"
              value={cookingInstructions}
              onChange={(e) => setCookingInstructions(e.target.value)}
            />
          </div>

          {/* ── Savings Banner ── */}
          {discount > 0 && (
            <div className="cart-savings-banner">
              <div className="cart-savings-check">
                <CheckIcon />
              </div>
              <div className="cart-savings-text">
                <div className="cart-savings-title">
                  You saved ₹{discount} on this order
                </div>
                <div className="cart-savings-sub">
                  Yay! You're dining smarter.
                </div>
              </div>
              <div className="cart-savings-emoji">🎉</div>
            </div>
          )}
        </div>

        {/* ════════ RIGHT COLUMN ════════ */}
        <div className="cart-right">
          {/* ── Bill Details ── */}
          <div className="cart-bill-card">
            <h2 className="cart-bill-title">Bill Details</h2>

            <div className="cart-bill-row">
              <span className="bill-label">
                Item Total ({totalQty} item{totalQty !== 1 ? "s" : ""})
              </span>
              <span className="bill-value">₹{itemTotal.toLocaleString()}</span>
            </div>

            <div className="cart-bill-row">
              <span className="bill-label">Delivery Fee</span>
              <span className="bill-value">₹{deliveryFee}</span>
            </div>

            <div className="cart-bill-row">
              <span className="bill-label">
                Platform Fee
                <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </span>
              <span className="bill-value">₹{platformFee}</span>
            </div>

            <div className="cart-bill-row discount">
              <span className="bill-label">Discount (FOODIE50)</span>
              <span className="bill-value">- ₹{discount}</span>
            </div>

            <div className="cart-bill-divider" />

            <div className="cart-bill-total">
              <span>Grand Total</span>
              <span>₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* ── Apply Coupon ── */}
          <div className="cart-coupon-box">
            <CouponIcon />
            <div className="cart-coupon-info">
              <div className="cart-coupon-title">Apply coupon</div>
              <div className="cart-coupon-sub">Save more on this order</div>
            </div>
            <span className="cart-coupon-arrow">›</span>
          </div>

          {/* ── Donate ── */}
          <div className="cart-bill-card" style={{ padding: "0 24px" }}>
            <div className="cart-donate-box">
              <input type="checkbox" className="cart-donate-checkbox" id="donate-check" />
              <label className="cart-donate-text" htmlFor="donate-check">
                <div className="cart-donate-title">
                  Donate ₹5 to a food charity
                  <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                </div>
                <div className="cart-donate-sub">
                  Help end hunger, one meal at a time.
                </div>
              </label>
            </div>

            {/* ── Delivery Address ── */}
            <div className="cart-delivery-box">
              <LocationPin />
              <div className="cart-delivery-info">
                <div className="cart-delivery-label">Deliver to Home</div>
                <div className="cart-delivery-address">
                  House No. 12, 3rd Cross, Koramangala
                  <br />
                  Bengaluru, 560034
                </div>
              </div>
              <button className="cart-delivery-change">Change</button>
            </div>
          </div>

          {/* ── Checkout Button ── */}
          <button className="cart-checkout-btn">
            Proceed to Checkout <span className="arrow">→</span>
          </button>

          {/* ── Safe Checkout ── */}
          <div className="cart-safe-checkout">
            <ShieldCheck />
            <div className="cart-safe-text">
              <strong>Safe and secure checkout.</strong>
              <br />
              Your payment information is protected.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;