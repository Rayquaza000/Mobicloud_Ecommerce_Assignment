import React from 'react'
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

const ProductCard = ({id,imgsrc,productName,productPrice,productDescription}) => {
  const user=useSelector((state)=>state.auth.user);
  const navigate=useNavigate()
  async function addOneToCart(){
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

  function navigateToProductPage(){
    navigate("/product/"+id);
  }
  return (
    <div className='flex flex-col p-2 bg-blue-300 border border-white w-full max-w-xs mx-auto' onClick={navigateToProductPage}>
        <img src={imgsrc} className='w-full h-40 sm:h-60 object-cover'></img>
        <div className='flex flex-row mt-1 justify-between text-sm sm:text-base'>
            <span className='bg-white rounded-[5px] p-1 px-2 truncate'>{productName}</span>
            <span>Rs. {productPrice}/-</span>
        </div>
        <button className='bg-gray-800 border-2 border-black p-1 px-2 text-white mt-2 text-sm sm:text-base' onClick={(e)=>{e.stopPropagation();addOneToCart();}}>Add to cart</button>
        <div className='flex flex-col mt-1'>
            <span className='font-bold text-sm sm:text-base'>Description</span>
            <span className='text-wrap text-xs sm:text-sm'>{productDescription}</span>
        </div>  
    </div>
  )
}

export default ProductCard