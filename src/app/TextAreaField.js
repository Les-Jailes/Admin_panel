// TextAreaField.js
import React from "react";
import style from "./page.module.css";

export default function TextAreaField({ label, name, value, onChange, placeholder }) {
  return (
    <div className={style.inputContainer}>
      <label className={style.label}>
        {label}:
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className={style.input}
          placeholder={placeholder}
        />
      </label>
      <br />
    </div>
  );
}