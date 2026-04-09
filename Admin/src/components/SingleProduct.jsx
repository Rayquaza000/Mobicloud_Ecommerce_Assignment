import React, { useState } from 'react'

export const SingleProduct = ({productId,productName,productCategory,productPrice,productQuantity,productImage,productDescription,updateList,setUpdateList}) => {
    const [editButton,setEditButton]=useState("Edit");
    const [editable,setEditable]=useState(false);
    const[name,setName]=useState(productName);
    const [category,setCategory]=useState(productCategory);
    const [price,setPrice]=useState(productPrice);
    const [quantity,setQuantity]=useState(productQuantity);
    const [image,setImage]=useState(productImage);
    const [description,setDescription]=useState(productDescription);
    async function handleEdit()
    {
        if(editButton=="Edit")
        {
            setEditable(true);
            setEditButton("Update");
        }
        else{
            try{
                const options={
                    method:"PUT",
                    headers:{
                        'Content-Type':"application/json"
                    },
                    body: JSON.stringify({productName:name,productCategory:category,productImage:image,productPrice:price,productQuantity:quantity,productDescription:description}),
                    credentials: 'include'
                }
                const response=await fetch("https://mobicloud-ecommerce-backend.onrender.com/product/"+productId,options);
                if(response.ok)
                {
                    const json_response=await response.json();
                    console.log(json_response.message);
                    setEditable(false);
                    setEditButton("Edit")
                }
            }
            catch(error)
            {
                console.log(error)
            }
        }
    }

    async function handleDelete(){
        try{
            const options={
                method:"DELETE",
                    headers:{
                        'Content-Type':"application/json"
                    },
                    credentials: 'include'
            }
            const response=await fetch("https://mobicloud-ecommerce-backend.onrender.com/product/"+productId, options);
            if(response.ok)
            {
                setUpdateList(!updateList);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }
    return (
    <>
        {/* Mobile card view */}
        <div className='block sm:hidden border border-gray-300 p-4 rounded mb-4'>
            <div className='mb-2'><strong>ID:</strong> {productId}</div>
            <div className='mb-2'>
                <strong>Name:</strong> 
                {editable ? <input value={name} onChange={(e)=>setName(e.target.value)} className='border p-1 w-full' /> : name}
            </div>
            <div className='mb-2'>
                <strong>Category:</strong> 
                {editable ? <input value={category} onChange={(e)=>setCategory(e.target.value)} className='border p-1 w-full' /> : category}
            </div>
            <div className='mb-2'>
                <strong>Price:</strong> 
                {editable ? <input value={price} onChange={(e)=>setPrice(e.target.value)} className='border p-1 w-full' /> : price}
            </div>
            <div className='mb-2'>
                <strong>Quantity:</strong> 
                {editable ? <input value={quantity} onChange={(e)=>setQuantity(e.target.value)} className='border p-1 w-full' /> : quantity}
            </div>
            <div className='mb-2'>
                <strong>Image:</strong> 
                {editable ? <input value={image} onChange={(e)=>setImage(e.target.value)} className='border p-1 w-full' /> : image}
            </div>
            <div className='mb-2'>
                <strong>Description:</strong> 
                {editable ? <input value={description} onChange={(e)=>setDescription(e.target.value)} className='border p-1 w-full' /> : description}
            </div>
            <div className='flex gap-2'>
                <button onClick={handleEdit} className='bg-blue-500 text-white px-3 py-1 rounded'>{editButton}</button>
                <button onClick={handleDelete} className='bg-red-500 text-white px-3 py-1 rounded'>Delete</button>
            </div>
        </div>

        {/* Desktop table row view */}
        <tr className='hidden sm:table-row'>
            <td className='border border-gray-300 p-2'>{productId}</td>
            <td className='border border-gray-300 p-2'>
                {editable ? <input value={image} onChange={(e)=>setImage(e.target.value)} className='w-full' /> : image}
            </td>
            <td className='border border-gray-300 p-2'>
                {editable ? <input value={name} onChange={(e)=>setName(e.target.value)} className='w-full' /> : name}
            </td>
            <td className='border border-gray-300 p-2'>
                {editable ? <input value={category} onChange={(e)=>setCategory(e.target.value)} className='w-full' /> : category}
            </td>
            <td className='border border-gray-300 p-2'>
                {editable ? <input value={price} onChange={(e)=>setPrice(e.target.value)} className='w-full' /> : price}
            </td>
            <td className='border border-gray-300 p-2'>
                {editable ? <input value={quantity} onChange={(e)=>setQuantity(e.target.value)} className='w-full' /> : quantity}
            </td>
            <td className='border border-gray-300 p-2'>
                {editable ? <input value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full' /> : description}
            </td>
            <td className='border border-gray-300 p-2'><button onClick={handleEdit} className='bg-blue-500 text-white px-2 py-1 rounded'>Edit</button></td>
            <td className='border border-gray-300 p-2'><button onClick={handleDelete} className='bg-red-500 text-white px-2 py-1 rounded'>Delete</button></td>
        </tr>
    </>
  )
}
