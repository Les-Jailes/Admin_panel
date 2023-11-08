import React from "react";
import "@/css/AddProducts/InputContainer.css";

export default function CheckboxWithQuantity({ size, checked, onChange, quantity, onQuantityChange, }) {
  return (
    <div className="inputContainerQuantity">
      <label className="label">
        {size}
      </label>
      <input
          type="checkbox"
          name="size"
          value={size}
          onChange={onChange}
          className="checkbox"
          checked={checked}
        />
        {checked && (
        <input
          type="number"
          name={`quantity_${size}`}
          value={quantity}
          onChange={(e) => onQuantityChange(e, size)}
          className="quantityNumber"
        />
      )}
      <br />
    </div>
  );
}