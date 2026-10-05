import React from "react";

function Input({
  type = "text",
  placeholder,
  value,
  onChange
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="custom-input"
    />
  );
}

export default Input;