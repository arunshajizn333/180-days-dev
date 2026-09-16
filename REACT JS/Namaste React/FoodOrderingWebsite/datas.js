export const RESTAURANTS = [
  {
    id: 1,
    name: "The Pizza House",
    cuisines: "Pizza, Italian",
    rating: 4.5,
    reviews: "1.2K+",
    priceForTwo: "₹ 200 for two",
    deliveryTime: "30–40 mins",
    freeDelivery: true,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Burger Point",
    cuisines: "Burgers, Fast Food",
    rating: 4.2,
    reviews: "980+",
    priceForTwo: "₹ 250 for two",
    deliveryTime: "25–35 mins",
    freeDelivery: true,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Biryani Blues",
    cuisines: "Biryani, North Indian",
    rating: 4.6,
    reviews: "2.1K+",
    priceForTwo: "₹ 300 for two",
    deliveryTime: "20–30 mins",
    freeDelivery: true,
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Chinese Wok",
    cuisines: "Chinese, Asian",
    rating: 4.3,
    reviews: "860+",
    priceForTwo: "₹ 220 for two",
    deliveryTime: "30–45 mins",
    freeDelivery: true,
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80",
  },
];

const CATEGORIES = [
  { id: "all", name: "All", icon: "⊞", bg: "#fff0e6" },
  { id: "pizza", name: "Pizza", icon: "🍕", bg: "#fff5f0" },
  { id: "burger", name: "Burger", icon: "🍔", bg: "#fffbe8" },
  { id: "biryani", name: "Biryani", icon: "🍛", bg: "#fff7ed" },
  { id: "chinese", name: "Chinese", icon: "🍜", bg: "#f5f0ff" },
  { id: "south-indian", name: "South Indian", icon: "🥞", bg: "#eefdf8" },
  { id: "desserts", name: "Desserts", icon: "🍰", bg: "#fff0f3" },
  { id: "beverages", name: "Beverages", icon: "🥤", bg: "#fff7ed" },
  { id: "more", name: "More", icon: "•••", bg: "#f3f4f6" },
];




module.exports = { RESTAURANTS, CATEGORIES };