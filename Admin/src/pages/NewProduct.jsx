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
                })
            }
            const response=await fetch("http://localhost:8000/product",options);
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
    <>
        <span>New Product</span>
        <label>Name:</label>
        <input type="text" placeholder='product name' className='pl-1 border border-black' value={name} onChange={(e)=>{setName(e.target.value)}}></input>
        <label>Image URL:</label>
        <input type="text" placeholder='imageURL' className='pl-1 border border-black' value={imageurl} onChange={(e)=>{setImageURL(e.target.value)}}></input>
        <label>Category:</label>
        <input type="number" placeholder='category' className='pl-1 border border-black' value={category} onChange={(e)=>{setCategory(e.target.value)}}></input>
        <label>Price:</label>
        <input type="number" placeholder='price' className='pl-1 border border-black' value={price} onChange={(e)=>{setPrice(e.target.value)}}></input>
        <label>Quantity:</label>
        <input type="number" placeholder='quantity' className='pl-1 border border-black' value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}></input>
        <label>Description:</label>
        <input type="text" placeholder="Description" className='pl-1 border border-black' value={description} onChange={(e)=>{setDescription(e.target.value)}}></input>
        <button onClick={addNewProduct}>+Add Product</button>
        <span>{message}</span>
    </>
  )
}
