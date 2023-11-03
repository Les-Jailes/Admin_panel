// InputField.js
import React from "react";
import style from "./page.module.css";
import '@/app/colorInput.css'

export default function InputField({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className={style.inputContainer}>
      <label className={style.label}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`input ${type}`}
        placeholder={placeholder}
      />
      <br />
    </div>
  );
}
