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
                console.log('Failed to update order status');
            }
        } catch (error) {
            console.log('Error updating order status:', error);
        }
    }
    return (
    <div className='flex flex-col border border-green-600'>
        <div className='flex flex-row border-b border-b-black'>
            <span>OrderID:</span>
            <span>{orderId}</span>
            <span>UserID:</span>
            <span>{userId}</span>
            <span>Status:</span>
            <span onClick={()=>{setEditable(!editable)}}>{oStatus}</span>
            { editable ? (
                <div>
                    <span onClick={()=>{handleStatus("Pending")}}>Pending</span>
                    <span onClick={()=>{handleStatus("Shipped")}}>Shipped</span>
                    <span onClick={()=>{handleStatus("Delivered")}}>Delivered</span>
                    <span onClick={()=>{handleStatus("Cancelled")}}>Cancelled</span>
                </div>
            ) : null}
        </div>
        <div className='flex flex-row'>
            <div className='flex flex-col'>
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