import React from "react";
import ReactDOM from "react-dom/client";

const restaurants = [
  {
    id: 1,
    name: "The Pizza House",
    image: "pizza-house.jpg",
    cuisines: ["Pizza", "Italian"],
    rating: 4.5,
    ratingCount: "1.2K+",
    priceForTwo: 200,
    deliveryTime: "30–40 mins",
    offer: "50% OFF",
    freeDelivery: true,
    location: "MG Road",
    distance: "2.1 km",
  },
  {
    id: 2,
    name: "Burger Point",
    image: "burger-point.jpg",
    cuisines: ["Burgers", "Fast Food"],
    rating: 4.2,
    ratingCount: "980+",
    priceForTwo: 250,
    deliveryTime: "25–35 mins",
    offer: "40% OFF",
    freeDelivery: true,
    location: "Indiranagar",
    distance: "3.4 km",
  },
  {
    id: 3,
    name: "Biryani Blues",
    image: "biryani-blues.jpg",
    cuisines: ["Biryani", "North Indian"],
    rating: 4.6,
    ratingCount: "2.1K+",
    priceForTwo: 300,
    deliveryTime: "20–30 mins",
    offer: "30% OFF",
    freeDelivery: true,
    location: "Koramangala",
    distance: "1.8 km",
  },
  {
    id: 4,
    name: "Chinese Wok",
    image: "chinese-wok.jpg",
    cuisines: ["Chinese", "Asian"],
    rating: 4.3,
    ratingCount: "860+",
    priceForTwo: 220,
    deliveryTime: "30–45 mins",
    offer: "20% OFF",
    freeDelivery: true,
    location: "HSR Layout",
    distance: "4.2 km",
  },
  {
    id: 5,
    name: "South Spice",
    image: "south-spice.jpg",
    cuisines: ["South Indian", "Indian"],
    rating: 4.4,
    ratingCount: "1.5K+",
    priceForTwo: 180,
    deliveryTime: "20–30 mins",
    offer: "25% OFF",
    freeDelivery: false,
    location: "Jayanagar",
    distance: "3.7 km",
  },
  {
    id: 6,
    name: "Sweet Truth",
    image: "sweet-truth.jpg",
    cuisines: ["Desserts", "Bakery"],
    rating: 4.7,
    ratingCount: "720+",
    priceForTwo: 350,
    deliveryTime: "25–35 mins",
    offer: "15% OFF",
    freeDelivery: true,
    location: "Whitefield",
    distance: "5.1 km",
  },
];


const NavBar=()=>(
    <div className="navbar">

    </div>
)
const HeroSection=()=>(
    <div className="hero-section">

    </div>
)
const CategorySection=()=>(
    <div className="category-section">

    </div>
)
const OfferSection=()=>(
    <div className="offer-section">

    </div>
)
const RestaurantSection=()=>(
    <div className="res-section">

    </div>
)
const footer=()=>(
    <div className="foter">

    </div>
)







const MainContainer=()=>(
    <div className="main-container">
        <h1>hello</h1>


    </div>
)
 




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MainContainer/>);


