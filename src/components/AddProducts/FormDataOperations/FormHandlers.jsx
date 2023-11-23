import { useState } from "react";

export const handleDescriptionChange = (e, setDescription) => {
  const value = e.target.value;

  if (value.length > 650) {
    return;
  }

  setDescription(value);
};

export const handleInputChange = (e, formData, setFormData) => {
  const { name, value } = e.target;

  if (name === "code" && (isNaN(value) || value.length > 4 || /^0+$/.test(value))) {
    return;
  }

  if (name === "price" && (isNaN(value) || parseInt(value) < 1 || parseInt(value) > 10000)) {
    return;
  }

  if (name === "name" && value.length > 120) {
    return;
  }

  const updatedData =
    name === "color" && value === "" ?
      { ...formData, [name]: "#ffffff" } : { ...formData, [name]: value };

  setFormData(updatedData);
};

export const handleCategoriaChange = (e, formData, setFormData, getDefaultSize) => {
  const categoria = e.target.value;
  setFormData({
    ...formData,
    category: categoria,
    type: "",
    size: getDefaultSize(categoria),
  });
};

export const handleSizeChange = (e, formData, setFormData) => {
  const { value, checked } = e.target;

  const updatedSize = [...formData.size];
  const sizeIndex = updatedSize.findIndex((sizeObj) => sizeObj.size === value);

  if (checked) {
    if (sizeIndex !== -1) {
      updatedSize[sizeIndex].quantity += 1;
    } else {
      updatedSize.push({ size: value, quantity: 1 });
    }
  } else if (sizeIndex !== -1 && updatedSize[sizeIndex].quantity > 1) {
    updatedSize[sizeIndex].quantity -= 1;
  } else {
    updatedSize.splice(sizeIndex, 1);
  }

  setFormData({ ...formData, size: updatedSize });
};

export const handleQuantityChange = (e, size, formData, setFormData) => {
  const { value } = e.target;
  const parsedValue = parseInt(value, 10);

  if (parseInt(value) < 1) {
    return;
  }

  const updatedSize = [...formData.size];

  const existingSizeIndex = formData.size.findIndex((sizeObj) => sizeObj.size === size);

  if (existingSizeIndex !== -1) {
    updatedSize[existingSizeIndex] = {
      ...updatedSize[existingSizeIndex],
      quantity: isNaN(parsedValue) ? "" : parsedValue,
    };
  } else {
    updatedSize.push({
      size: size,
      quantity: isNaN(parsedValue) ? "" : parsedValue,
    });
  }

  setFormData({ ...formData, size: updatedSize });
};

export const handleImageChange = (index, value, formData, setFormData) => {
  if (value && !value.startsWith("http://") && !value.startsWith("https://")) {
    console.error("The URL of the image must begin with 'http://' or 'https://'");
    return;
  }
  const updatedImages = [...formData.images];
  updatedImages[index] = value;
  setFormData({ ...formData, images: updatedImages });
};


export const handleAddImage = (formData, setFormData) => {
  setFormData({ ...formData, images: [...formData.images, ""] });
};

export const handleDeleteImage = (index, formData, setFormData) => {
  if (index === 0 && formData.images.length >= 1) {
    return;
  }

  const updatedImages = formData.images.filter((_, i) => i !== index);
  const updatedSize = formData.size.filter((obj) => obj.id !== index);

  setFormData({
    ...formData,
    images: updatedImages,
    size: updatedSize,
  });
};
