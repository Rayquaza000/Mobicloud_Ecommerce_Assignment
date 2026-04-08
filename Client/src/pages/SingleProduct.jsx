import React, { useEffect, useState } from 'react'

export const SingleProduct = () => {
    const {id}=useParams();
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
    
  return (
    <div className='flex flex-row flex-1'>
        <img src={currentProduct.productImage}></img>
        <div className='flex flex-row flex-1'>
            <span>{currentProduct.productName}</span>
            <span>{currentProduct.productPrice}</span>
            <span>{currentProduct.productDescription}</span>            
        </div>
    </div>
  )
}
