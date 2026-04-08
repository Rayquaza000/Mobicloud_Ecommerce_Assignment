import React, { useState } from 'react'

export const SingleProduct = ({productId,productName,productCategory,productPrice,productQuantity,productImage,updateList,setUpdateList}) => {
    const [editButton,setEditButton]=useState("Edit");
    const [editable,setEditable]=useState(false);
    const[name,setName]=useState(productName);
    const [category,setCategory]=useState(productCategory);
    const [price,setPrice]=useState(productPrice);
    const [quantity,setQuantity]=useState(productQuantity);
    const [image,setImage]=useState(productImage);
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
                    body: JSON.stringify({productName:name,productCategory:category,productImage:image,productPrice:price,productQuantity:quantity}),
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
    <tr>
        <td contentEditable={editable}>{productId}</td>
        <td contentEditable={editable} onChange={(e)=>{setImage(e.target.value)}}>{image}</td>
        <td contentEditable={editable} onChange={(e)=>{setName(e.target.value)}}>{name}</td>
        <td contentEditable={editable} onChange={(e)=>{setCategory(e.target.value)}}>{category}</td>
        <td contentEditable={editable} onChange={(e)=>{setPrice(e.target.value)}}>{price}</td>
        <td contentEditable={editable} onChange={(e)=>{setQuantity(e.target.value)}}>{quantity}</td>
        <td><button onClick={handleEdit}>{editButton}</button></td>
        <td><button onClick={handleDelete}>Delete</button></td>
    </tr>
  )
}
