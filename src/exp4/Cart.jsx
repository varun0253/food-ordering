import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Cart({
  cart,
  removeFromCart,
  updateQuantity,
  clearCart
}) {
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">

      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>

          <Button onClick={() => navigate("/food")}>
            🍔 Browse Food
          </Button>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              className="cart-item"
              key={item.id}
            >
              <h3>{item.image} {item.name}</h3>

              <p>
                ₹{item.price} × {item.quantity}
              </p>

              <Button
                onClick={() =>
                  updateQuantity(
                    item.id,
                    item.quantity - 1
                  )
                }
              >
                −
              </Button>

              <span>{item.quantity}</span>

              <Button
                onClick={() =>
                  updateQuantity(
                    item.id,
                    item.quantity + 1
                  )
                }
              >
                +
              </Button>

              <Button
                onClick={() =>
                  removeFromCart(item.id)
                }
              >
                Remove
              </Button>
            </div>
          ))}

          <h3>
            Total: ₹{total}
          </h3>

          <Button onClick={() => navigate("/checkout")}>
            💳 Buy Now / Checkout
          </Button>

          <Button onClick={clearCart}>
            Clear Cart
          </Button>
        </>
      )}

    </div>
  );
}

export default Cart;