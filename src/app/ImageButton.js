// ImageButton.js
import React from "react";
import style from "./page.module.css";

export default function ImageButton({ index, value, onChange }) {
  return (
    <div className="imageButtonInput" key={index}>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(index, e.target.value)}
        className={style.input}
        placeholder="a"
      />
      <br />
    </div>
  );
}