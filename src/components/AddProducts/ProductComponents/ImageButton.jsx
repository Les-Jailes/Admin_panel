import React from "react";
import "@/css/AddProducts/ImagePathContainer.css";
import "@/css/AddProducts/InputContainer.css";

export default function ImageButton({ index, value, onChange, }) {
  return (
    <div className="image-button-input" key={index}>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(index, e.target.value)}
        className="input"
      />
      <br />
    </div>
  );
}