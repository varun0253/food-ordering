import React from "react";
import Button from "./Button";

/* =====================================
   FOOD CARD COMPONENT
   Reusable card for displaying a food item
   Accepts API data from TheMealDB
===================================== */

function FoodCard({ food, addToCart, onViewDetails }) {
  return (
    <div className="food-card">

      {/* Food Image from API */}
      <div className="food-image">
        {food.strMealThumb ? (
          <img
            src={food.strMealThumb}
            alt={food.strMeal}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%"
            }}
          />
        ) : (
          <span>🍽️</span>
        )}
      </div>

      {/* Food Name */}
      <h3>{food.strMeal}</h3>

      {/* Category */}
      <p>Category: {food.strCategory || "—"}</p>

      {/* Area / Origin */}
      <p>🌍 {food.strArea || "International"}</p>

      {/* Price (derived from idMeal for demo) */}
      <h4>₹{food.price || Math.floor((parseInt(food.idMeal) % 300) + 100)}</h4>

      {/* View Details Button */}
      {onViewDetails && (
        <button
          onClick={() => onViewDetails(food.idMeal)}
          style={{
            background: "#fff",
            color: "#5b5ce2",
            border: "2px solid #5b5ce2",
            marginBottom: "6px"
          }}
        >
          🔍 View Details
        </button>
      )}

      {/* Add to Cart */}
      <Button onClick={() => addToCart(food)}>
        🛒 Add to Cart
      </Button>

    </div>
  );
}

export default FoodCard;