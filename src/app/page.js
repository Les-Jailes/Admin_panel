"use client";
import AddProductForm from "@/components/AddProducts/AddProductForm";
import style from "@/css/AddProducts/page.module.css";

export default function Home() {
  return (
    <div className={style.signupFrm}>
      <AddProductForm />
    </div>
  );
}