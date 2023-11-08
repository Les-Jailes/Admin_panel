import React from "react";
import "@/css/AddProducts/InputContainer.css";

export default function InputField({ label, type, name, value, onChange, placeholder,}) {
  return (
    <div className="inputContainer">
      <label className="label">{label}</label>
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
