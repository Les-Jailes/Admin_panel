import React, { useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
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
import getDefaultSize from "@/utils/Form/sizeClothes";
import getDefaultTypes from "@/utils/Form/typesClothes";
import useHandleEffect from "./FormDataOperations/useEffect";
import {
  handleDescriptionChange, handleInputChange, handleCategoriaChange,
  handleSizeChange, handleQuantityChange, handleImageChange,
  handleAddImage, handleDeleteImage,
} from "@/components/AddProducts/FormDataOperations/FormHandlers";


export default function AddProductForm({ navigation }) {
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

  const errorMessage = (code, name, description, price, category, size, image ,type) => {
    let error = "";
    if (code) {
      error = error + "- <b>Code</b>, enter a number between 1 and 9999<br>";
    }
    if (!name) {
      error = error + "- <b>Name</b>, do not leave this field empty<br>";
    }else  if (/^\s+$/.test(name)) {
        error = error + "- <b>Name</b>, cannot contain only spaces<br>";
    }
    
    if (!description) {
      error = error + "- <b>Description</b>, do not leave this field empty<br>";
    }else if (/^\s+$/.test(description)) {
        error = error + "- <b>Description</b>, cannot contain only spaces<br>";
    }
    
    if (price) {
      error = error + "- <b>Price</b>, enter a value from 1 to 500<br>";
    }
    if (category) {
      error = error + "- <b>Category</b>, select one category<br>";
    }
    console.log(size)
    console.log(size[6])
    
    if (size.length < 7) {
      error = error + "- <b>Size</b>, select at least one size<br>";
    }else{
      if(size[6] && size[6].quantity.length < 1){
        error = error + "- <b>Size</b>, enter valid number in size amount     <br>";
      }else if(size[7] &&size[7].quantity.length < 1){
        error = error + "- <b>Size</b>, enter valid number in size amount     <br>";
      }else if(size[8] && size[8].quantity.length < 1){
        error = error + "- <b>Size</b>, enter valid number in size amount     <br>";
      }else if(size[9] && size[9].quantity.length < 1){
        error = error + "- <b>Size</b>, enter valid number in size amount     <br>";
      }else if(size[10] && size[10].quantity.length < 1){
        error = error + "- <b>Size</b>, enter valid number in size amount     <br>";
      }else if(size[11] && size[11].quantity.length < 1){
        error = error + "- <b>Size</b>, enter valid number in size amount     <br>";
      }
    }
    if (image[0] === "") {
      error = error + "- <b>Image</b>, enter at least one URL image<br>";
    }
    if (type) {
      error = error + "- <b>Type</b>, select any valid type <br>";
    }
    error = error.slice(0, -4); 
  
    return error;
  };

  const submit = async () => {
    const errorFields = errorMessage(
      !formData.code,
      formData.name,
      description,
      !formData.price,
      !formData.category,
      formData.size,
      formData.images,
      !formData.type
    );
  
    if (errorFields && errorFields.length > 1) {
      console.log(formData)
      const errorMessageText = `Please enter correct values in the following fields:<br><br> ${errorFields}`;
      Swal.fire({
        title: 'Error!',
        html: errorMessageText,
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    if (formData.code && formData.name && formData.price && formData.category && formData.type) {
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
        Swal.fire({
          title: 'Success!',
          text: `${formData.name} has been correctly been created.`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigation("/")
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
              <AiOutlinePlus size={18}/>
            </button>
          </div>
        </div>
        <button type="button" onClick={submit} className="form__button">
          Add Product
        </button>
      </form>
    </div>
  );
}