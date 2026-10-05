import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

import { AuthProvider, useAuth } from "./exp4/AuthContext";
import Login from "./exp4/Login";
import Signup from "./exp4/Signup";
import ProtectedRoute from "./exp4/ProtectedRoute";
import ErrorBoundary from "./exp4/ErrorBoundary";

import Cart from "./exp4/Cart";
import Checkout from "./exp4/Checkout";

// a) REST API via Axios — service layer
import {
  fetchFoodsByCategory,
  fetchCategories,
  searchFoodsByName
} from "./exp4/foodApi";

// d) Reusable FoodCard component
import FoodCard from "./exp4/FoodCard";

// g) Individual food details component
import FoodDetail from "./exp4/FoodDetail";

// f) Loading component
import Loading from "./exp4/Loading";

import "./exp4/exp4.css";


/* =====================================
   HOME PAGE
===================================== */

function Home() {
  return (
    <div className="home-page">

      <section className="hero">

        <div className="hero-content">

          <span className="hero-small">
            🍽️ Welcome to Foodie
          </span>

          <h1>
            Delicious Food.
            <br />
            Delivered to You.
          </h1>

          <p>
            Discover your favorite meals, order easily,
            and enjoy delicious food from the comfort of your home.
          </p>

          <Link to="/food">
            <button className="hero-button">
              🍽️ Explore Food Menu
            </button>
          </Link>

        </div>

      </section>

    </div>
  );
}


/* =====================================
   FOOD MENU
   a) REST API via Axios
   b) useEffect to fetch on load
   c) async/await
   d) Reusable FoodCard components
   e) Search + category filtering
   f) Loading and error messages
   g) FoodDetail for individual items
===================================== */

function FoodMenu({ addToCart }) {

  // --- State ---
  const [foods, setFoods]               = useState([]);
  const [categories, setCategories]     = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Seafood");
  const [searchQuery, setSearchQuery]   = useState("");
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [selectedMealId, setSelectedMealId] = useState(null);


  // b) useEffect — fetch categories once on mount
  useEffect(() => {

    async function loadCategories() {
      try {
        // a) Axios call via service layer
        const data = await fetchCategories();
        setCategories(data);
      } catch {
        // non-critical — ignore category load error
      }
    }

    loadCategories();

  }, []);


  // b) useEffect — fetch foods whenever selected category changes
  useEffect(() => {

    // c) async/await inside useEffect
    async function loadFoods() {
      try {
        setLoading(true);
        setError(null);

        // a) Axios REST API call
        const data = await fetchFoodsByCategory(selectedCategory);
        setFoods(data);

      } catch (err) {
        // f) Error message
        setError("⚠️ Failed to load food items. Please check your internet connection and try again.");
        setFoods([]);

      } finally {
        setLoading(false);
      }
    }

    loadFoods();

  }, [selectedCategory]);


  // e) Handle search — call API with Axios when user searches
  async function handleSearch(e) {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setError(null);

      // a) Axios search call
      const results = await searchFoodsByName(searchQuery.trim());

      if (results.length === 0) {
        setError(`🔍 No food found for "${searchQuery}". Try another name.`);
      }

      setFoods(results);

    } catch {
      setError("⚠️ Search failed. Please try again.");

    } finally {
      setLoading(false);
    }
  }


  // Reset search — reload category
  function handleReset() {
    setSearchQuery("");
    setSelectedCategory("Seafood");
  }


  return (
    <div className="food-menu">

      <h2>🍽️ Food Menu</h2>

      <p className="section-description">
        Discover dishes from around the world. Search or filter by category.
      </p>


      {/* e) Search Bar */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="🔍 Search food e.g. Chicken, Pasta..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
        {searchQuery && (
          <button type="button" onClick={handleReset}>
            ✕ Clear
          </button>
        )}
      </form>


      {/* e) Category Filter Buttons */}
      <div className="category-filters">
        {categories.slice(0, 10).map((cat) => (
          <button
            key={cat.idCategory}
            className={selectedCategory === cat.strCategory ? "filter-btn active" : "filter-btn"}
            onClick={() => {
              setSelectedCategory(cat.strCategory);
              setSearchQuery("");
            }}
          >
            {cat.strCategory}
          </button>
        ))}
      </div>


      {/* f) Loading State */}
      {loading && <Loading />}


      {/* f) Error State */}
      {!loading && error && (
        <div className="error-page" style={{ margin: "30px auto" }}>
          <h3>{error}</h3>
          <button onClick={() => {
            setError(null);
            setSelectedCategory("Seafood");
          }}>
            🔄 Retry
          </button>
        </div>
      )}


      {/* d) Food Grid using reusable FoodCard */}
      {!loading && !error && (
        <>
          <p style={{ color: "#888", marginBottom: "10px" }}>
            {foods.length} item{foods.length !== 1 ? "s" : ""} found
          </p>

          <div className="food-grid">
            {foods.map((food) => (
              // d) Reusable FoodCard component
              <FoodCard
                key={food.idMeal}
                food={food}
                addToCart={addToCart}
                // g) Pass handler for individual detail fetch
                onViewDetails={(id) => setSelectedMealId(id)}
              />
            ))}
          </div>

          {foods.length === 0 && (
            <p style={{ color: "#aaa", marginTop: "40px" }}>
              No items to display.
            </p>
          )}
        </>
      )}


      <Link to="/cart">
        <button style={{ marginTop: "30px" }}>
          🛒 View Cart
        </button>
      </Link>


      {/* g) Individual food detail modal (uses Axios via FoodDetail) */}
      {selectedMealId && (
        <FoodDetail
          mealId={selectedMealId}
          onClose={() => setSelectedMealId(null)}
        />
      )}

    </div>
  );
}


/* =====================================
   ORDERS
===================================== */

function Orders() {
  return (
    <div className="orders">

      <div className="page-icon">
        📦
      </div>

      <h2>My Orders</h2>

      <p>
        Your order is being processed.
      </p>

    </div>
  );
}


/* =====================================
   ORDER CONFIRMATION
===================================== */

function OrderConfirmation() {
  return (
    <div className="order-confirmation">

      <div className="success-icon">
        ✓
      </div>

      <h1>
        🎉 Order Confirmed!
      </h1>

      <p>
        Your food order has been placed successfully.
      </p>

      <p>
        Thank you for ordering with Foodie!
      </p>

      <Link to="/food">
        <button>
          🍽️ Order More Food
        </button>
      </Link>

      <Link to="/">
        <button>
          🏠 Back to Home
        </button>
      </Link>

    </div>
  );
}


/* =====================================
   NAVIGATION
===================================== */

function Navigation() {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {

    logout();

    navigate("/");

  };

  return (
    <nav className="main-nav">

      <div className="logo">
        🍔 Foodie
      </div>

      <div className="nav-links">

        <Link to="/">
          🏠 Home
        </Link>

        <Link to="/food">
          🍽️ Food Menu
        </Link>

        <Link to="/cart">
          🛒 Cart
        </Link>

        <Link to="/orders">
          📦 Orders
        </Link>

        {!user ? (

          <>
            <Link to="/login">
              🔐 Login
            </Link>

            <Link to="/signup">
              📝 Sign Up
            </Link>
          </>

        ) : (

          <div className="user-section">

            <span className="username">
              👤 {user.username}
            </span>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>

          </div>

        )}

      </div>

    </nav>
  );
}


/* =====================================
   EXPERIMENT 4
===================================== */

function Experiment4() {

  const [cart, setCart] = useState([]);


  /* Add Food */

  const addToCart = (food) => {

    setCart((currentCart) => {

      const existingFood = currentCart.find(
        (item) => item.id === food.id
      );

      if (existingFood) {

        return currentCart.map((item) =>
          item.id === food.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        );

      }

      return [
        ...currentCart,
        {
          ...food,
          quantity: 1
        }
      ];

    });

  };


  /* Remove Food */

  const removeFromCart = (id) => {

    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    );

  };


  /* Update Quantity */

  const updateQuantity = (id, quantity) => {

    if (quantity < 1) {

      removeFromCart(id);

      return;

    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity
            }
          : item
      )
    );

  };


  /* Clear Cart */

  const clearCart = () => {
    setCart([]);
  };


  return (
    <AuthProvider>

      <BrowserRouter>

        <Navigation />

        <ErrorBoundary>

          <Routes>

            {/* Home */}

            <Route
              path="/"
              element={<Home />}
            />


            {/* Food Menu */}

            <Route
              path="/food"
              element={
                <FoodMenu
                  addToCart={addToCart}
                />
              }
            />


            {/* Login */}

            <Route
              path="/login"
              element={<Login />}
            />


            {/* Sign Up */}

            <Route
              path="/signup"
              element={<Signup />}
            />


            {/* Protected Cart */}

            <Route
              path="/cart"
              element={
                <ProtectedRoute>

                  <Cart
                    cart={cart}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                    clearCart={clearCart}
                  />

                </ProtectedRoute>
              }
            />


            {/* Protected Checkout */}

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>

                  <Checkout
                    cart={cart}
                    clearCart={clearCart}
                  />

                </ProtectedRoute>
              }
            />


            {/* Protected Orders */}

            <Route
              path="/orders"
              element={
                <ProtectedRoute>

                  <Orders />

                </ProtectedRoute>
              }
            />


            {/* Protected Order Confirmation */}

            <Route
              path="/order-confirmation"
              element={
                <ProtectedRoute>

                  <OrderConfirmation />

                </ProtectedRoute>
              }
            />

          </Routes>

        </ErrorBoundary>

      </BrowserRouter>

    </AuthProvider>
  );
}

export default Experiment4;