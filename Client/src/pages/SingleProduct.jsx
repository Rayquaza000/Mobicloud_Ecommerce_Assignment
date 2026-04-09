import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const SingleProduct = () => {
    const {id}=useParams();
    const user = useSelector((state) => state.auth.user);
    const [currentProduct,setCurrentProduct]=useState(null);
    useEffect(()=>{
        async function getCurrentProduct(){
        try{
        const response=await fetch("https://mobicloud-ecommerce-backend.onrender.com/product/"+id);
        if(response.ok)
        {
            const json_response=await response.json();
            setCurrentProduct(json_response.product);
        }
        else{
            console.log("product couldnt be fetched");
        }
    }
    catch(error)
    {
        console.log(error)
    }
}
getCurrentProduct();
    },[])

    async function addOneToCart(){
        if (!user) return;
        try{
          const response = await fetch(`https://mobicloud-ecommerce-backend.onrender.com/addToCart/${user.userId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
              itemId: id,
              update: "add"
            })
          });
          if(response.ok)
          {
            console.log("Product successfully added to cart")
          }
          else{
            const error = await response.json();
            console.log("Failed to add product to cart:", error.error);
          }
        }
        catch(error)
        {
          console.log(error);
        }
      }
    
  return (
    <div className='flex flex-col sm:flex-row flex-1 p-4 gap-4'>
        <img src={currentProduct?.productImage} className='w-full sm:w-1/2 h-64 sm:h-auto object-cover'></img>
        <div className='flex flex-col flex-1'>
            <h1 className='text-xl sm:text-2xl font-bold mb-2'>{currentProduct?.productName}</h1>
            <p className='text-lg sm:text-xl font-semibold mb-2'>Rs. {currentProduct?.productPrice}/-</p>
            <p className='text-sm sm:text-base mb-4'>{currentProduct?.productDescription}</p>
            {user && <button className='bg-gray-800 border-2 border-black p-2 text-white w-full sm:w-auto' onClick={addOneToCart}>Add to cart</button>}
        </div>
    </div>
  )
}
