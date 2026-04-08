import React from 'react'
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

const ProductCard = ({id,imgsrc,productName,productPrice,productDescription}) => {
  const user=useSelector((state)=>state.auth.user);
  const navigate=useNavigate()
  async function addOneToCart(){
    try{
      const response=fetch("http://localhost:8000/addToCart/"+user);
      if(response.ok)
      {
        console.log("Product successfully added to cart")
      }
      else{
        console.log("Failed to add product to cart");
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
    <div className='flex flex-col p-2 bg-blue-300 border border-white w-54' onClick={navigateToProductPage}>
        <img src={imgsrc} className='w-50 h-60'></img>
        <div className='flex flex-row mt-1 justify-between'>
            <span className='bg-white rounded-[5px] p-1 px-2'>{productName}</span>
            <span>Rs. {productPrice}/-</span>
        </div>
        <button className='bg-gray-800 border-2 border-black p-1 px-2 text-white mt-2' onClick={(e)=>{e.stopPropagation();addOneToCart();}}>Add to cart</button>
        <div className='flex flex-col mt-1'>
            <span className='font-bold '>Description</span>
            <span className='text-wrap'>{productDescription}</span>
        </div>  
    </div>
  )
}

export default ProductCard