import React from "react";
import { AiOutlineMinus } from "react-icons/ai";
import "@/css/AddProducts/ImagePathContainer.css";

const DeleteButton = ({ index, onClick }) => {
  return (
    <button type="button" className="image-path-container__deleteButton" onClick={() => onClick(index)}>
      <AiOutlineMinus size={18} />
    </button>
  );
};

export default DeleteButton;