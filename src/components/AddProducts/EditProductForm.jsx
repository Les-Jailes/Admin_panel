import React, { useState, useEffect } from 'react';
import API from "@/components/Api/api";
import Swal from 'sweetalert2';
import '@/css/updateProducts/updateForm.css'


const EditProductForm = ({ product }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const handleChange = (e, size) => {
    const { name, value } = e.target;

    if (name === 'quantity') {
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        sizes: prevProduct.sizes.map((prevSize) =>
          prevSize.size === size ? { ...prevSize, quantity: value } : prevSize
        ),
      }));
    } else {
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };
  const handleSave = async () => {
    try {
      const response = await API.put(`/Product/${editedProduct._id}`, editedProduct);
      Swal.fire({
        title: 'Success!',
        text: `${editedProduct.name} has been correctly modified.`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
      if (response.status === 200) {
        onSave(editedProduct);
      }
    } catch (error) {
    }
  };

  return (
    <form className='formEdit'>
      <h1 className='titledit'>Edit Product Size Form</h1>
      <label className='labelEdit'>
        Name of Product:
        <input
          className='inputEdit'
          type="text"
          name="name"
          value={editedProduct.name}
          onChange={handleChange}
          disabled
        />
      </label>

      <label className='labelEdit'>
        Price:
        <input
          className='inputEdit'
          type="text"
          name="price"
          value={editedProduct.price}
          onChange={handleChange}
          disabled
        />
      </label>

      <label className='labelEdit'>
        Description:
        <textarea
          name="description"
          value={editedProduct.description}
          onChange={handleChange}
          disabled
          className='inputEdit'
        />
      </label>

      <label className='labelEdit'>
        Category:
        <input
          className='inputEdit'
          type="text"
          name="category"
          value={editedProduct.category}
          onChange={handleChange}
          disabled
        />
      </label>

      <label className='labelEdit'>
        Type:
        <input
          className='inputEdit'
          type="text"
          name="type"
          value={editedProduct.type}
          onChange={handleChange}
          disabled
        />
      </label>

      <label className='labelEdit'>
        Color:
        <input
          className='inputEdit'
          type="text"
          name="color"
          value={editedProduct.color[0]}
          onChange={handleChange}
          disabled
        />
      </label>

      <label className='labelEdit labelEdit-size-title'>
        Sizes:
        {editedProduct.sizes.map((size) => (
          <div key={size._id} className='content-container'>
            <label className='labelEdit labelEdit-size'>{size.size}:</label>
            <input
              name="quantity"
              type='number'
              className='sizeEdit-txt'
              value={size.quantity}
              onChange={(e) => handleChange(e, size.size)}
              min={0}
            />
          </div>
        ))}
      </label>
      <label className='imgEdit' >
        Image Paths (comma-separated):
        <input
          className='inputEdit'
          type="text"
          name="path"
          value={editedProduct.path.join(', ')}
          onChange={handleChange}
          disabled
        />
      </label>
      <button type="button" onClick={handleSave} className='buttonEdit'>
        Save Changes
      </button>
    </form>
  );
};

export default EditProductForm;
