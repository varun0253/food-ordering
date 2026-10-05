import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] =
    useState("Cash on Delivery");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !address) {
      alert("Please fill all required fields.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Enter a valid 10-digit phone number.");
      return;
    }

    if (!payment) {
      alert("Please select a payment method.");
      return;
    }

    navigate("/order-confirmation");
  };

  return (
    <div className="checkout">

      <h2>💳 Checkout</h2>

      <form onSubmit={handleSubmit}>

        <Input
          placeholder="Customer Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <Input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        <textarea
          placeholder="Delivery Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
        />

        <select
          value={payment}
          onChange={(e) =>
            setPayment(e.target.value)
          }
        >
          <option>Cash on Delivery</option>
          <option>UPI</option>
          <option>Credit Card</option>
        </select>

        <Button type="submit">
          Place Order
        </Button>

      </form>

    </div>
  );
}

export default Checkout;