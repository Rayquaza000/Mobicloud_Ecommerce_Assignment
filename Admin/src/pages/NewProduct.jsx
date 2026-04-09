import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const NewProduct = () => {
    const [name,setName]=useState(null);
    const [imageurl,setImageURL]=useState(null);
    const [price,setPrice]=useState(null);
    const [quantity,setQuantity]=useState(null);
    const [category,setCategory]=useState(null);
    const navigate=useNavigate();
    const [message,setMessage]=useState(null);
    const [description,setDescription]=useState(null);
    async function addNewProduct()
    {
        try{
            if(name==null || imageurl==null ||price==null || quantity==null || category==null || description==null)
            {
                setMessage("Fill all details");
                return null;
            }
            const options={
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    productName:name,
                    productPrice:price,
                    productCategory:category,
                    productQuantity:quantity,
                    productImage:imageurl,
                    productDescription:description
                }),
                credentials: 'include'
            }
            const response=await fetch("https://mobicloud-ecommerce-backend.onrender.com/product",options);
            if(response.ok)
            {
                setMessage("Product added successfully");
                setTimeout(()=>{setMessage(null);navigate("/products")},3000);
            }
            else{
                setMessage("Product not added to server. Try again");
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }
  return (
    <div className='flex flex-col items-center px-4 py-6'>
        <div className='w-full max-w-lg bg-white p-6 border border-gray-300 rounded shadow-sm'>
            <h1 className='text-2xl font-bold mb-4'>New Product</h1>
            <div className='grid gap-4'>
                <label className='flex flex-col text-sm sm:text-base'>
                    Name:
                    <input type="text" placeholder='product name' className='pl-2 border border-black w-full py-2 mt-1' value={name} onChange={(e)=>{setName(e.target.value)}} />
                </label>
                <label className='flex flex-col text-sm sm:text-base'>
                    Image URL:
                    <input type="text" placeholder='imageURL' className='pl-2 border border-black w-full py-2 mt-1' value={imageurl} onChange={(e)=>{setImageURL(e.target.value)}} />
                </label>
                <label className='flex flex-col text-sm sm:text-base'>
                    Category:
                    <input type="text" placeholder='category' className='pl-2 border border-black w-full py-2 mt-1' value={category} onChange={(e)=>{setCategory(e.target.value)}} />
                </label>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <label className='flex flex-col text-sm sm:text-base'>
                        Price:
                        <input type="number" placeholder='price' className='pl-2 border border-black w-full py-2 mt-1' value={price} onChange={(e)=>{setPrice(e.target.value)}} />
                    </label>
                    <label className='flex flex-col text-sm sm:text-base'>
                        Quantity:
                        <input type="number" placeholder='quantity' className='pl-2 border border-black w-full py-2 mt-1' value={quantity} onChange={(e)=>{setQuantity(e.target.value)}} />
                    </label>
                </div>
                <label className='flex flex-col text-sm sm:text-base'>
                    Description:
                    <input type="text" placeholder="Description" className='pl-2 border border-black w-full py-2 mt-1' value={description} onChange={(e)=>{setDescription(e.target.value)}} />
                </label>
                <button className='bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto' onClick={addNewProduct}>+Add Product</button>
                {message && <span className='text-sm text-red-600'>{message}</span>}
            </div>
        </div>
    </div>
  )
}
