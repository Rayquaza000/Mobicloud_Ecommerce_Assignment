import React, { useState } from 'react'

const SingleOrder = ({userId,orderId,orderStatus,orderItems,orderItemPrice,orderItemQuantity,orderTotalPrice}) => {
    const [sum,setSum]=useState(0);
    return (
    <div className='flex flex-col border border-green-600'>
        <div className='flex flex-row border-b border-b-black'>
            <span>OrderID:</span>
            <span>{orderId}</span>
            <span>UserID:</span>
            <span>{userId}</span>
            <span>Status:</span>
            <span>{orderStatus}</span>
        </div>
        <div className='flex flex-row'>
            <div className='flex flex-col '>
                <span>Order Items</span>
                {orderItems?.map((item)=>{return <span>{item}</span>})}
            </div>
        </div>
        <div className='flex flex-row'>
            <div className='flex flex-col '>
                <span>Price</span>
                {orderItemPrice?.map((item)=>{return <span>{item}</span>})}
            </div>
        </div>
        <div className='flex flex-row'>
            <div className='flex flex-col '>
                <span>Quantity</span>
                {orderItemQuantity?.map((item)=>{return <span>{item}</span>})}
            </div>
        </div>
        <div className='flex flex-row'>
            <div className='flex flex-col '>
                <span>Total price of each product</span>
                { orderItemPrice?.map((item,index)=> index==orderItemPrice.length-1 ? <span className='border-b border-b-black'>{ item * orderItemQuantity[index] }</span> : <span>{ item * orderItemQuantity[index]}</span>)}
            </div>
        </div>
        <div className='flex flex-row justify-end'>
            <span>{orderTotalPrice}</span>
        </div>
    </div>
  )
}

export default SingleOrder