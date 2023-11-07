import React from "react";
import "@/css/AddProducts/InputContainer.css";

export default function TextAreaField({ label, name, value, onChange, placeholder, }) {
  return (
    <div className="descriptionContainer">
      <label className="label">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="descriptionInput"
        placeholder={placeholder}
      />
    </div>
  );
}