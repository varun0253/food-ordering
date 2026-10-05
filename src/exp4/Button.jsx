import React from "react";

function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="custom-button"
    >
      {children}
    </button>
  );
}

export default Button;