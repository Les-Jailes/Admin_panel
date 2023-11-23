"use client";
import AddProductForm from "@/components/AddProducts/AddProductForm";
import GetProductForm from "@/components/AddProducts/GetProductForm";
import "@/css/AddProducts/AddProductForm.css";

export default function Home() {
  return (
    <div className="addProductForm">
      <GetProductForm />
    </div>
  );
}