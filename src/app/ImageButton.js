// ImageButton.js
import React from "react";
import style from "./page.module.css";

export default function ImageButton({ index, value, onChange, onAddImage, isDisabled }) {
  return (
    <div key={index}>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(index, e.target.value)}
        className={style.input}
        placeholder="a"
      />
      <br />
      <button type="button" onClick={onAddImage} disabled={isDisabled}>
        Añadir otra imagen
      </button>
    </div>
  );
}