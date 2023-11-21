import React from 'react';
import "@/css/AddProducts/GetProductForm.css";

const GetProductForm = () => {
  return (
    <div className='container'>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name of Product</th>
            <th>Price</th>
            <th>Category</th>
            <th>Type</th>
            <th>Color</th>
            <th>Size</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>001</td>
            <td>Product 1</td>
            <td>$19.99</td>
            <td>Women</td>
            <td>Shirts</td>
            <td>Blue</td>
            <td>L</td>
            <td><img src="product_image_url" alt="Product" /></td>
            <td><button>Edit</button><button>Delete</button></td>
          </tr>

          <tr>
            <td>002</td>
            <td>Product 2</td>
            <td>$21.00</td>
            <td>Men</td>
            <td>Pants</td>
            <td>Black</td>
            <td>M</td>
            <td><img src="product_image_url" alt="Product" /></td>
            <td><button>Edit</button><button>Delete</button></td>
          </tr>
          
        </tbody>
      </table>
    </div>
  );
};

export default GetProductForm;