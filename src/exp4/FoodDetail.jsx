import React, { useState, useEffect } from "react";
import { fetchFoodById } from "./foodApi";

/* =====================================
   FOOD DETAIL MODAL
   Fetches and displays individual food
   details using Axios (REST API)
===================================== */

function FoodDetail({ mealId, onClose }) {

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // c) async/await + useEffect to fetch individual food detail
  useEffect(() => {

    async function loadMealDetail() {
      try {
        setLoading(true);
        setError(null);

        // g) Use Axios to retrieve individual food details
        const data = await fetchFoodById(mealId);
        setMeal(data);

      } catch (err) {
        setError("Failed to load food details. Please try again.");

      } finally {
        setLoading(false);
      }
    }

    if (mealId) {
      loadMealDetail();
    }

  }, [mealId]);


  return (
    <div className="food-detail-overlay" onClick={onClose}>

      <div
        className="food-detail-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close Button */}
        <button
          className="food-detail-close"
          onClick={onClose}
        >
          ✕ Close
        </button>

        {/* f) Loading State */}
        {loading && (
          <div className="loading">
            <h3>⏳ Loading Details...</h3>
            <p>Fetching food information from API.</p>
          </div>
        )}

        {/* f) Error State */}
        {!loading && error && (
          <div className="error-page">
            <h3>❌ {error}</h3>
          </div>
        )}

        {/* Meal Details */}
        {!loading && !error && meal && (
          <div className="food-detail-content">

            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="food-detail-image"
            />

            <h2>{meal.strMeal}</h2>

            <div className="food-detail-tags">
              <span className="tag">📂 {meal.strCategory}</span>
              <span className="tag">🌍 {meal.strArea}</span>
              {meal.strTags && meal.strTags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
                .map((tag) => (
                  <span key={tag} className="tag">🏷️ {tag}</span>
                ))
              }
            </div>

            <h3>📋 Instructions</h3>
            <p className="food-detail-instructions">
              {meal.strInstructions
                ? meal.strInstructions.slice(0, 400) + "..."
                : "No instructions available."}
            </p>

            <h3>🥣 Ingredients</h3>
            <ul className="food-detail-ingredients">
              {Array.from({ length: 20 }, (_, i) => i + 1)
                .map((i) => ({
                  ingredient: meal[`strIngredient${i}`],
                  measure: meal[`strMeasure${i}`],
                }))
                .filter(({ ingredient }) => ingredient && ingredient.trim())
                .map(({ ingredient, measure }, idx) => (
                  <li key={idx}>
                    {measure && measure.trim()} {ingredient}
                  </li>
                ))
              }
            </ul>

          </div>
        )}

      </div>

    </div>
  );
}

export default FoodDetail;
