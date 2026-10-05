// =====================================
// FOOD API SERVICE
// Uses Axios for REST API integration
// =====================================

import axios from "axios";

// Base URL for the food API (TheMealDB free public API)
const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Axios instance with base config
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});


// -------------------------------------------------------
// Fetch all meals by category (used as food menu items)
// -------------------------------------------------------
export async function fetchFoodsByCategory(category = "Seafood") {
  const response = await apiClient.get(`/filter.php?c=${category}`);
  return response.data.meals || [];
}


// -------------------------------------------------------
// Fetch all available categories
// -------------------------------------------------------
export async function fetchCategories() {
  const response = await apiClient.get("/categories.php");
  return response.data.categories || [];
}


// -------------------------------------------------------
// Search meals by name
// -------------------------------------------------------
export async function searchFoodsByName(name) {
  const response = await apiClient.get(`/search.php?s=${name}`);
  return response.data.meals || [];
}


// -------------------------------------------------------
// Fetch individual food detail by meal ID
// -------------------------------------------------------
export async function fetchFoodById(id) {
  const response = await apiClient.get(`/lookup.php?i=${id}`);
  const meals = response.data.meals;
  return meals ? meals[0] : null;
}
