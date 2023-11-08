import React from "react";
import "@/css/AddProducts/InputContainer.css";

export default function SelectField({ label, name, value, onChange, options, }) {
  return (
    <div className="inputContainer">
      <label className="label">{label}</label>
      <select className="select" name={name} value={value} onChange={onChange}>
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