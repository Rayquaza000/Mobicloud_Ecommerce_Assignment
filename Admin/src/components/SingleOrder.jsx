import React, { useState } from 'react'

const SingleOrder = ({userId,orderId,orderStatus,orderItems,orderItemPrice,orderItemQuantity,orderTotalPrice}) => {
    const [editable,setEditable]=useState(false);
    const [oStatus,setOStatus]=useState(orderStatus);
    
    async function handleStatus(changeStatusTo){
        try {
            const response = await fetch(`https://mobicloud-ecommerce-backend.onrender.com/orderStatus/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: changeStatusTo }),
                credentials: 'include'
            });
            
            if (response.ok) {
                setOStatus(changeStatusTo);
                setEditable(false);
            } else {
                console.log(await response.json().error);
            }
        } catch (error) {
            console.log('Error updating order status:', error);
        }
    }
    return (
    <div className='flex flex-col border border-green-600 p-2 mb-4'>
        <div className='flex flex-col sm:flex-row border-b border-b-black mb-2 gap-2'>
            <div className='flex flex-col sm:flex-row gap-1'>
                <span className='font-semibold'>OrderID:</span>
                <span>{orderId}</span>
            </div>
            <div className='flex flex-col sm:flex-row gap-1'>
                <span className='font-semibold'>UserID:</span>
                <span>{userId}</span>
            </div>
            <div className='flex flex-col sm:flex-row gap-1'>
                <span className='font-semibold'>Status:</span>
                <span onClick={()=>{setEditable(!editable)}} className='cursor-pointer underline'>{oStatus}</span>
            </div>
            { editable ? (
                <div className='flex flex-wrap gap-2 mt-2 sm:mt-0'>
                    <span onClick={()=>{handleStatus("Pending")}} className='cursor-pointer bg-yellow-200 px-2 py-1 rounded'>Pending</span>
                    <span onClick={()=>{handleStatus("Shipped")}} className='cursor-pointer bg-blue-200 px-2 py-1 rounded'>Shipped</span>
                    <span onClick={()=>{handleStatus("Delivered")}} className='cursor-pointer bg-green-200 px-2 py-1 rounded'>Delivered</span>
                    <span onClick={()=>{handleStatus("Cancelled")}} className='cursor-pointer bg-red-200 px-2 py-1 rounded'>Cancelled</span>
                </div>
            ) : null}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='flex flex-col'>
                <span className='font-semibold'>Order Items</span>
                {orderItems?.map((item, index)=>{return <span key={index}>{item}</span>})}
            </div>
            <div className='flex flex-col'>
                <span className='font-semibold'>Price</span>
                {orderItemPrice?.map((item, index)=>{return <span key={index}>{item}</span>})}
            </div>
            <div className='flex flex-col'>
                <span className='font-semibold'>Quantity</span>
                {orderItemQuantity?.map((item, index)=>{return <span key={index}>{item}</span>})}
            </div>
            <div className='flex flex-col'>
                <span className='font-semibold'>Total per item</span>
                { orderItemPrice?.map((item,index)=> <span key={index} className={index==orderItemPrice.length-1 ? 'border-b border-b-black' : ''}>{ item * orderItemQuantity[index] }</span>)}
            </div>
        </div>
        <div className='flex justify-end mt-2'>
            <span className='font-bold'>Total: {orderTotalPrice}</span>
        </div>
    </div>
  )
}

export default SingleOrder