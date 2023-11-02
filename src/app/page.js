"use client";
import React, { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    price: "",
    categoria: "",
    type: "",
    color: "",
    size: [],
    images: [""], // Inicia con un campo de imagen
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "code" && parseInt(value) < 1) {
      // Ignorar números negativos en el campo "Code"
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoriaChange = (e) => {
    const categoria = e.target.value;
    setFormData({
      ...formData,
      categoria,
      type: getDefaultType(categoria),
      size: getDefaultSize(categoria),
    });
  };

  const getDefaultType = (categoria) => {
    switch (categoria) {
      case "Women":
        return "Shirts";
      case "Men":
        return "Shirts";
      case "Boy":
        return "Shirts";
      case "Girl":
        return "T-shirts";
      default:
        return "";
    }
  };

  const getDefaultSize = (categoria) => {
    switch (categoria) {
      case "Women":
      case "Men":
        return ["XS", "S", "M", "L", "XL", "XXL"];
      case "Boy":
      case "Girl":
        return ["2", "4", "6", "8", "10", "12"];
      default:
        return [];
    }
  };

  const getDefaultTypes = (categoria) => {
    switch (categoria) {
      case "Women":
      case "Men":
      case "Boy":
        return [
          "Shirts",
          "T-shirts",
          "Sweaters",
          "Coats",
          "Suits",
          "Underwear",
          "Socks",
          "Pants",
          "Swimwear",
        ];
      case "Girl":
        return [
          "T-shirts",
          "Sweaters",
          "Coats",
          "Suits",
          "Underwear",
          "Socks",
          "Skirts",
          "Pants",
          "Swimwear",
        ];
      default:
        return [];
    }
  };

  const handleSizeChange = (e) => {
    const { name, value, checked } = e.target;

    const sizeIndex = formData.size.findIndex(
      (sizeObj) => sizeObj.size === value
    );

    if (checked) {
      if (sizeIndex !== -1) {
        const updatedSize = [...formData.size];
        updatedSize[sizeIndex] = {
          size: value,
          quantity: updatedSize[sizeIndex].quantity + 1,
        };
        setFormData({ ...formData, size: updatedSize });
      } else {
        setFormData({
          ...formData,
          size: [...formData.size, { size: value, quantity: 1 }],
        });
      }
    } else {
      if (sizeIndex !== -1) {
        const updatedSize = [...formData.size];
        if (updatedSize[sizeIndex].quantity > 1) {
          updatedSize[sizeIndex] = {
            size: value,
            quantity: updatedSize[sizeIndex].quantity - 1,
          };
          setFormData({ ...formData, size: updatedSize });
        } else {
          setFormData({
            ...formData,
            size: formData.size.filter((sizeObj) => sizeObj.size !== value),
          });
        }
      }
    }
  };

  const handleQuantityChange = (e, size) => {
    const { value } = e.target;
    const parsedValue = parseInt(value, 10);

    if (!isNaN(parsedValue) && parsedValue > 0) {
      const updatedSize = [...formData.size];
      const sizeIndex = updatedSize.findIndex(
        (sizeObj) => sizeObj.size === size
      );

      if (sizeIndex !== -1) {
        updatedSize[sizeIndex] = { size, quantity: parsedValue };
        setFormData({ ...formData, size: updatedSize });
      }
    }
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData({ ...formData, images: updatedImages });
  };

  const handleAddImage = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  return (
    <form>
      <h1>Add Product</h1>
      <label>
        Code:
        <input
          type="number"
          name="code"
          value={formData.code}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />

      <label>
        Price:
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Categoria:
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleCategoriaChange}
        >
          <option value="">Seleccione una categoría</option>
          <option value="Women">Women</option>
          <option value="Men">Men</option>
          <option value="Boy">Boy</option>
          <option value="Girl">Girl</option>
        </select>
      </label>
      <br />

      <label>
        Type:
        <select name="type" value={formData.type} onChange={handleInputChange}>
          {formData.categoria &&
            getDefaultTypes(formData.categoria).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
        </select>
      </label>
      <br />

      <label>
        Color:
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Size:
        {formData.categoria &&
          getDefaultSize(formData.categoria).map((size) => (
            <div key={size}>
              <label>
                <input
                  type="checkbox"
                  name="size"
                  value={size}
                  onChange={handleSizeChange}
                />
                {size}
              </label>
              {formData.size.find((sizeObj) => sizeObj.size === size) && (
                <input
                  type="number"
                  name={`quantity_${size}`}
                  value={
                    formData.size.find((sizeObj) => sizeObj.size === size)
                      .quantity
                  }
                  onChange={(e) => handleQuantityChange(e, size)}
                />
              )}
            </div>
          ))}
      </label>
      <br />

      <label>
        Image(s):
        {formData.images.map((image, index) => (
          <div key={index}>
            <input
              type="text"
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddImage}
          disabled={formData.images.some((image) => image.trim() === "")}
        >
          Añadir otra imagen
        </button>
      </label>
    </form>
  );
}