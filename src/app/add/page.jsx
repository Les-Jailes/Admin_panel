'use client'
import AddProductForm from '@/components/AddProducts/AddProductForm'
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {
  const router = useRouter();
  return (
    <div  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem'}}>
        <AddProductForm navigation={router.push}/>
    </div>
  )
}

export default page