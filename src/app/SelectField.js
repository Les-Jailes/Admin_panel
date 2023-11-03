// SelectField.js
import React from "react";
import style from "./page.module.css";

export default function SelectField({ label, name, value, onChange, options }) {
  return (
    <div className={style.inputContainer}>
      <label className={style.label}>{label}</label>
      <select className={style.select} name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <br />
    </div>
  );
}