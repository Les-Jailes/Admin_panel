import React, { useState, useEffect } from 'react';
import API from '@/components/Api/api';
import "@/css/AddProducts/GetProductForm.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { TbEditCircle } from "react-icons/tb";
import Link from 'next/link'
import Swal from 'sweetalert2';



const GetProductForm = () => {
  const [products, setProducts] = useState([]);

  const handleDelete = async (id, name) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setProducts((prevProducts) => prevProducts.filter(product => product._id !== id));

        API.delete(`/Product/${id}`)
        .then(
          console.log("")
        ).catch(error => console.log(error)) 
      }
    })
  
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/Product");
        setProducts(response.data);
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='container'>
      <div>
        <button className='add-button'>
          Add Product
        </button>
      </div>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name of Product</th>
              <th>Price</th>
              <th>Category</th>
              <th>Type</th>
              <th>Color</th>
              <th>Sizes</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id.$oid}>
                <td className='code'>{product.code}</td>
                <td>{product.name}</td>
                <td className='price'>${product.price}</td>
                <td className='category'>{product.category}</td>
                <td className='type'>{product.type}</td>
                <td className='color'>{product.color?.join(', ')}</td>
                <td className='size'>
                  {product.sizes.map((size, index) => (
                    <div key={index}>
                      {`${size.size}: ${size.quantity}`}
                    </div>
                  ))}
                </td>

                <td className='image'>
                  {product.path.length > 0 && (
                    <img src={product.path[0]} alt={`Product 1`} style={{ width: '50px', height: '50px' }} />
                  )}
                </td>

                <td>
                  <Link href={"/"} className="actionButton" onClick={()=>handleDelete(product._id, product.name)}>
                    <IoMdCloseCircleOutline className='delete-button' /> 
                  </Link>
                  <Link href={"/"} className = "actionButton">
                    <TbEditCircle className='edit-button' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetProductForm;