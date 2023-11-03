import React from "react";
import style from "./page.module.css";

export default function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className={style.descriptionContainer}>
      <label className={style.label}>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className={style.descriptionInput}
        placeholder={placeholder}
      />
    </div>
  );
}