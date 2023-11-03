import React, { useState, useEffect } from "react";
import style from "./page.module.css";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import SelectField from "./SelectField";
import CheckboxWithQuantity from "./CheckboxWithQuantity";
import ImageButton from "./ImageButton";
import axios from "axios";
import API from "./api";
import { AiOutlinePlus } from "react-icons/ai";
import DeleteButton from "./DeleteButton";
import "@/app/AddProductForm.css";

export default function AddProductForm() {
  const [sizes, setSizes] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    price: "",
    category: "",
    type: "",
    color: "",
    size: [],
    images: [""],
    description: "",
  });

  const [description, setDescription] = useState("");

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "code" || name === "price" && parseInt(value) < 1) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoriaChange = (e) => {
    const categoria = e.target.value;
    setFormData({
      ...formData,
      category: categoria,
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

    if (value === "" || (!isNaN(parsedValue) && parsedValue >= 1)) {
      const updatedSize = [...formData.size];
      const sizeIndex = updatedSize.findIndex(
        (sizeObj) => sizeObj.size === size
      );

      if (sizeIndex !== -1) {
        updatedSize[sizeIndex] = {
          size,
          quantity: value === "" ? "" : parsedValue,
        };
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

  const handleDeleteImage = (index) => {
    setFormData((prevFormData) => {
      if (index === 0 && prevFormData.images.length >= 1) {
        return prevFormData;
      }
  
      const updatedImages = prevFormData.images.filter((_, i) => i !== index);
      const updatedSize = prevFormData.size.filter((obj) => obj.id !== index);
  
      return {
        ...prevFormData,
        images: updatedImages,
        size: updatedSize,
      };
    });
  };
  
  const submit = async (event) => {
    event.preventDefault();
    const producForm = {
      code: formData.code,
      name: formData.name,
      price: formData.price,
      category: formData.category,
      type: formData.type,
      color: formData.color,
      size: sizes,
      images: formData.images,
      description: formData.description,
    };
    try {
      const response = await API.post("/product", producForm);
      console.log(response.status, response.data.token);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };
  useEffect(() => {
    const getCheckedSizes = () => {
      const updatedSizes = [];
      formData.size.forEach((sizeObj) => {
        if (sizeObj && sizeObj.size && sizeObj.quantity) {
          const newSize = sizeObj.size + " " + sizeObj.quantity;
          updatedSizes.push(newSize);
        }
      });
      setSizes(updatedSizes);
    };
    getCheckedSizes();
  }, [formData.size]);
  return (
    <div className="pageContainer">
      <form className={style.form}>
        <h1>Add Product</h1>
        <InputField
          label="Code"
          type="number"
          name="code"
          value={formData.code}
          onChange={handleInputChange}
        />
        <InputField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextAreaField
          label="Description"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <InputField
          label="Price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
        <SelectField
          label="Categoria"
          name="categoria"
          value={formData.category}
          onChange={handleCategoriaChange}
          options={["Select a category", "Women", "Men", "Boy", "Girl"]}
        />
        <SelectField
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          options={getDefaultTypes(formData.category)}
        />
        <InputField
          label="Color"
          type="color"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
        />
        {formData.category &&
          getDefaultSize(formData.category).map((size) => (
            <CheckboxWithQuantity
              key={size}
              size={size}
              checked={formData.size.some((sizeObj) => sizeObj.size === size)}
              onChange={handleSizeChange}
              quantity={
                formData.size.find((sizeObj) => sizeObj.size === size)
                  ?.quantity || ""
              }
              onQuantityChange={(e) => handleQuantityChange(e, size)}
            />
          ))}
        <div className="inputImage">
          <label className={style.label}>Image(s)</label>
          <div className="image-path-container">
            <div className="image-button-container">
              {formData.images.map((image, index) => (
                <div key={index} className="image-button-wrapper">
                  <ImageButton
                    index={index}
                    value={image}
                    onChange={handleImageChange}
                  />
                </div>
              ))}
            </div>
            {formData.images.length > 0 && (
              <DeleteButton
                index={formData.images.length - 1}
                onClick={handleDeleteImage}
              />
            )}
            <button
              className="plusButton"
              type="button"
              onClick={handleAddImage}
            >
              <AiOutlinePlus size={18} />
            </button>
          </div>
        </div>
        <button
          className={`${style.button} button`}
          type="button"
          onClick={submit}
        >
          Add
        </button>
      </form>
    </div>
  );
}