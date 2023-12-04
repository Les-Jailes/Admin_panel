import React, { useState, useEffect } from 'react';
import API from "@/components/Api/api";
import Swal from 'sweetalert2';
import '@/css/updateProducts/updateForm.css'
import { useRouter } from 'next/router';
import Link from 'next/link';


const EditProductForm = ({ product, navigation }) => {
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
  const errorMessage = (sizes) => {
    let error = "";
    if (sizes[0] && !sizes[0].quantity) {
      error = error + `- <b>Size ${sizes[0].size}</b> can not be empty and has to be a valid number                    <br>`;
    }else if (sizes[0] && sizes[0].quantity && parseInt(sizes[0].quantity) < 1){
      error = error + `- <b>Size ${sizes[0].size}</b> must be greater than zero<br>`;
    }

    if (sizes[1] && !sizes[1].quantity) {
      error = error + `- <b>Size ${sizes[1].size}</b> can not be empty and has to be a valid number                    <br>`;
    }else if (sizes[1] && sizes[1].quantity && parseInt(sizes[1].quantity) < 1){
      error = error + `- <b>Size ${sizes[1].size}</b> must be greater than zero<br>`;
    }

    if (sizes[2] && !sizes[2].quantity) {
      error = error + `- <b>Size ${sizes[2].size}</b> can not be empty and has to be a valid number                    <br>`;
    }else if (sizes[2] && sizes[2].quantity && parseInt(sizes[2].quantity) < 1){
      error = error + `- <b>Size ${sizes[2].size}</b> must be greater than zero<br>`;
    }

    if (sizes[3] && !sizes[3].quantity) {
      error = error + `- <b>Size ${sizes[3].size}</b> can not be empty and has to be a valid number                    <br>`;
    }else if (sizes[3] && sizes[3].quantity && parseInt(sizes[3].quantity) < 1){
      error = error + `- <b>Size ${sizes[3].size}</b> must be greater than zero<br>`;
    }

    if (sizes[4] && !sizes[4].quantity) {
      error = error + `- <b>Size ${sizes[4].size}</b> can not be empty and has to be a valid number                    <br>`;
    }else if (sizes[4] && sizes[4].quantity && parseInt(sizes[4].quantity) < 1){
      error = error + `- <b>Size ${sizes[4].size}</b> must be greater than zero<br>`;
    }

    if (sizes[5] && !sizes[5].quantity) {
      error = error + `- <b>Size ${sizes[5].size}</b> can not be empty and has to be a valid number                    <br>`;
    }else if (sizes[5] && sizes[5].quantity && parseInt(sizes[5].quantity) < 1){
      error = error + `- <b>Size ${sizes[5].size}</b> must be greater than zero<br>`;
    }
    return error
  }
  const handleSave = async () => {
    const errorSizes = errorMessage(editedProduct.sizes)
    if(errorSizes &&  errorSizes.length >1){
      console.log(editedProduct)
      const errorMessageText = `${errorSizes}`;
      Swal.fire({
        title: 'Error!',
        html: errorMessageText,
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }else{
      try {
        const response = await API.put(`/Product/${editedProduct._id}`, editedProduct);
        Swal.fire({
          title: 'Success!',
          text: `${editedProduct.name} has been correctly modified.`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigation("/")
        if (response.status === 200) {
          onSave(editedProduct);
        }
      } catch (error) {
      }
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
      <button type= "button" onClick={handleSave} className='buttonEdit'>
        Save Changes
      </button>
    </form>
  );
};

export default EditProductForm;
