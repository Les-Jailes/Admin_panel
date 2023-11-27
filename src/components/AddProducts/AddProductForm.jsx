  import React, { useState } from "react";
  import API from "@/components/Api/api";
  import InputField from "./ProductComponents/InputField";
  import TextAreaField from "./ProductComponents/TextAreaField";
  import SelectField from "./ProductComponents/SelectField";
  import CheckboxWithQuantity from "./ProductComponents/CheckboxWithQuantity";
  import ImageButton from "./ProductComponents/ImageButton";
  import DeleteButton from "./ProductComponents/DeleteButton";
  import { AiOutlinePlus } from "react-icons/ai";
  import "@/css/AddProducts/FormContainer.css";
  import "@/css/AddProducts/InputContainer.css";
  import Swal from 'sweetalert2';

  import {
    handleDescriptionChange, handleInputChange, handleCategoriaChange,
    handleSizeChange, handleQuantityChange, handleImageChange,
    handleAddImage, handleDeleteImage,
  } from "@/components/AddProducts/FormDataOperations/FormHandlers";

  import getDefaultSize from "@/utils/Form/sizeClothes";
  import getDefaultTypes from "@/utils/Form/typesClothes";
  import useHandleEffect from "./FormDataOperations/useEffect";

  export default function AddProductForm() {
    const [sizes, setSizes] = useState([]);
    const [formData, setFormData] = useState({
      code: "",
      name: "",
      description: "",
      price: "",
      category: "",
      type: "",
      color: "#ffffff",
      size: [],
      images: [""],
    });

    const [description, setDescription] = useState("");

    const submit = async (event) => {
      
      if (formData.code && formData.name && formData.price && formData.category && formData.type) {
        event.preventDefault();
        const filteredSize = formData.size.filter(item => typeof item === 'object');
        const productForm = {
          code: formData.code,
          name: formData.name,
          description: description,
          price: formData.price,
          category: formData.category,
          type: formData.type,
          color: formData.color,
          sizes: filteredSize,          
          path: formData.images,
        };
        try {
          const response = await API.post("/Product", productForm);
        } catch (error) {
          console.error("Axios Error:", error);
        }
      }      
    };

    useHandleEffect(formData, setSizes);

    return (
      <div className="pageContainer">
        <form className="form">
          <h1 className="title" >Add Product</h1>
          <InputField
            label="Code"
            type="number"
            name="code"
            className="input"
            value={formData.code}
            onChange={(e) => handleInputChange(e, formData, setFormData)}
          />
          <InputField
            label="Name"
            type="text"
            name="name"
            className="input"
            value={formData.name}
            onChange={(e) => handleInputChange(e, formData, setFormData)}
          />
          <TextAreaField
            label="Description"
            name="description"
            className="input"
            value={description}
            onChange={(e) => handleDescriptionChange(e, setDescription)}
          />
          <InputField
            label="Price"
            type="number"
            name="price"
            className="input"
            value={formData.price}
            onChange={(e) => handleInputChange(e, formData, setFormData)}
          />
          <SelectField
            label="Categoria"
            name="categoria"
            className="input"
            value={formData.category}
            onChange={(e) =>
              handleCategoriaChange(e, formData, setFormData, getDefaultSize)
            }
            options={["Select a category", "Women", "Men", "Boy", "Girl"]}
          />
          <SelectField
            label="Type"
            name="type"
            className="input"
            value={formData.type}
            onChange={(e) => handleInputChange(e, formData, setFormData)}
            options={getDefaultTypes(formData.category)}
          />
          <InputField
            label="Color"
            type="color"
            name="color"
            className="input"
            value={formData.color}
            onChange={(e) => handleInputChange(e, formData, setFormData)}
          />

          {formData.category &&
            getDefaultSize(formData.category).map((size) => (
              <CheckboxWithQuantity
                key={size}
                size={size}
                checked={formData.size.some((sizeObj) => sizeObj.size === size)}
                onChange={(e) => handleSizeChange(e, formData, setFormData)}
                quantity={
                  formData.size.find((sizeObj) => sizeObj.size === size)
                    ?.quantity || ""
                }
                onQuantityChange={(e) =>
                  handleQuantityChange(e, size, formData, setFormData)
                }
              />
            ))}
          <div className="inputImage">
            <label className="label">Image(s)</label>
            <div className="image-path-container">
              <div className="image-button-container">
                {formData.images.map((image, index) => (
                  <div key={index} className="image-button-wrapper">
                    <ImageButton
                      index={index}
                      value={image}
                      onChange={(index, value) =>
                        handleImageChange(index, value, formData, setFormData)
                      }
                    />
                  </div>
                ))}
              </div>
              {formData.images.length > 0 && (
                <DeleteButton
                  index={formData.images.length - 1}
                  onClick={(index) =>
                    handleDeleteImage(index, formData, setFormData)
                  }
                />
              )}
              <button
                className="image-path-container__plusButton"
                type="button"
                onClick={() => handleAddImage(formData, setFormData)}>
                <AiOutlinePlus size={18} />
              </button>
            </div>
          </div>
          <button className="form__button" type="button" onClick={submit}>
            Add Product
          </button>
        </form>
      </div>
    );
  }