'use client'
import { useState, useEffect } from 'react';
import API from "@/components/Api/api";
import EditProductForm from '@/components/AddProducts/EditProductForm';
import '@/css/updateProducts/updateForm.css'

const Page = ({ params }) => {
  const [productData, setProductData] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);
  

  const getProductData = async (id) => {
    try {
      const response = await API.get(`/Product/${id}`);
      setProductData(response.data);
      setEditedProduct(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    const isPageRefreshed = localStorage.getItem('isPageRefreshed');

    if (!isPageRefreshed) {
      
      localStorage.setItem('isPageRefreshed', true);
      location.reload();
    } }
  )
  useEffect(() => {
    getProductData(params.id);
  }, [params.id]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '110vh' }}>
    <EditProductForm
      product={editedProduct}
      onChange={(updatedProduct) => setEditedProduct(updatedProduct)}
    />
  </div>
  );
};

export default Page;
