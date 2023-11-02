// CheckboxWithQuantity.js
import React from "react";
import style from "./page.module.css";

export default function CheckboxWithQuantity({ size, checked, onChange, quantity, onQuantityChange }) {
  return (
    <div className={style.inputContainer}>
      <label className={style.label}>
        <input
          type="checkbox"
          name="size"
          value={size}
          onChange={onChange}
          className={style.input}
          checked={checked}
        />
        {size}
      </label>
      {checked && (
        <input
          type="number"
          name={`quantity_${size}`}
          value={quantity}
          onChange={(e) => onQuantityChange(e, size)}
          className={style.input}
          placeholder="a"
        />
      )}
      <br />
    </div>
  );
}