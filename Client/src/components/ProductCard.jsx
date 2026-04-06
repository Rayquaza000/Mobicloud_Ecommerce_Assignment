import React from 'react'

const ProductCard = ({imgsrc,productName,productPrice,productDescription}) => {
  return (
    <div className='flex flex-col p-2 bg-blue-300 border border-white w-54'>
        <img src={imgsrc} className='w-50 h-60'></img>
        <div className='flex flex-row mt-1 justify-between'>
            <span className='bg-white rounded-[5px] p-1 px-2'>{productName}</span>
            <span>Rs. {productPrice}/-</span>
        </div>
        <button className='bg-gray-800 border-2 border-black p-1 px-2 text-white mt-2'>Add to cart</button>
        <div className='flex flex-col mt-1'>
            <span className='font-bold '>Description</span>
            <span className='text-wrap'>{productDescription}</span>
        </div>  
    </div>
  )
}

export default ProductCard