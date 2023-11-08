import { useState } from "react";

export const handleDescriptionChange = (e, setDescription) => {
  setDescription(e.target.value);
};

export const handleInputChange = (e, formData, setFormData) => {
  const { name, value } = e.target;

  if ((name === "code" || name === "price") && parseInt(value) < 1) {
    return;
  }

  const updatedData =
    name === "color" && value === "" ? 
    { ...formData, [name]: "#ffffff" } : { ...formData, [name]: value };

  setFormData(updatedData);
};

export const handleCategoriaChange = ( e, formData, setFormData, getDefaultSize ) => {
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

  const updatedSize = (formData.size || []).map((sizeObj) => {
    if (sizeObj.size === size) {
      return { ...sizeObj, quantity: isNaN(parsedValue) ? "" : parsedValue };
    }
    return sizeObj;
  });

  setFormData({ ...formData, size: updatedSize });
};

export const handleImageChange = (index, value, formData, setFormData) => {
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