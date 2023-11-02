"use client";
import React, { useState } from "react";
import AddProductForm from "./AddProductForm";
import style from "./page.module.css";

export default function Home() {
  return (
    <div className={style.signupFrm}>
      <AddProductForm />
    </div>
  );
}