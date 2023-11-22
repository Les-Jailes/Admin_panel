import React, { useState } from 'react';
import API from "@/components/Api/api";
import '@/css/updateProducts/updateForm.css'
import Swal from 'sweetalert2';



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
    <form className='form'>
      <h1 className='title'>Edit Product Size Form</h1>
      <label className='label'>
        Name of Product:
        <input
          className='input'
          type="text"
          name="name"
          value={editedProduct.name}
          onChange={handleChange}
          disabled
        />
      </label>

      <label className='label'>
        Price:
        <input
          className='input'
          type="text"
          name="price"
          value={editedProduct.price}
          onChange={handleChange}
          disabled
        />
      </label>

      <label className='label'>
        Description:
        <textarea
          name="description"
          value={editedProduct.description}
          onChange={handleChange}
          disabled
          className='input'
        />
      </label>

      <label className='label'>
        Category:
        <input
          className='input'
          type="text"
          name="category"
          value={editedProduct.category}
          onChange={handleChange}
          disabled
        />
      </label>

      <label className='label'>
        Type:
        <input
          className='input'
          type="text"
          name="type"
          value={editedProduct.type}
          onChange={handleChange}
          disabled
        />
      </label>

      <label className='label'>
        Color:
        <input
          className='input'
          type="text"
          name="color"
          value={editedProduct.color[0]}
          onChange={handleChange}
          disabled
        />
      </label>

      <label className='label label-size-title'>
        Sizes:
        {editedProduct.sizes.map((size) => (
          <div key={size._id} className='content-container'>
            <label className='label label-size'>{size.size}:</label>
            <input
              name="quantity"
              type='number'
              className='size-txt'
              value={size.quantity}
              onChange={(e) => handleChange(e, size.size)}
            />
          </div>
        ))}
      </label>

      <label className='label img' >
        Image Paths (comma-separated):
        <input
          className='input'
          type="text"
          name="path"
          value={editedProduct.path.join(', ')}
          onChange={handleChange}
          disabled
        />
      </label>

      <button type="button" onClick={handleSave} className='button'>
        Save Changes
      </button>
    </form>
  );
};

export default EditProductForm;
