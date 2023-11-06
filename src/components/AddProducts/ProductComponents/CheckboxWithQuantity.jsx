import React from "react";
import style from "@/css/AddProducts/page.module.css";
//import "@/css/AddProducts/page.module.css"

export default function CheckboxWithQuantity({ size, checked, onChange, quantity, onQuantityChange, }) {
  return (
    <div className={style.inputContainerQuantity}>
      <label className={style.label}>
        {size}
      </label>
      <input
          type="checkbox"
          name="size"
          value={size}
          onChange={onChange}
          className={style.checkbox}
          checked={checked}
        />
        {checked && (
        <input
          type="number"
          name={`quantity_${size}`}
          value={quantity}
          onChange={(e) => onQuantityChange(e, size)}
          className={style.quantityNumber}
        />
      )}
      <br />
    </div>
  );
}