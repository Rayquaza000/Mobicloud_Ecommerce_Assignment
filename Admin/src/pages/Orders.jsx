import React, { useEffect } from 'react'
import SingleOrder from '../components/SingleOrder.jsx';
import { useState } from 'react';
export const Orders = () => {
    const [statusFilter,setStatusFilter]=useState("All");
    const [orders,setOrders]=useState([]);
    useEffect(()=>{
        async function getOrdersByCategory(){
            try{
                const response=await fetch("https://mobicloud-ecommerce-backend.onrender.com/orders/"+statusFilter, {
                    credentials: 'include'
                });
                
                const json_response=await response.json();
                if(response.ok)
                {
                    setOrders(json_response.orders || []);
                }
                else
                {
                    console.log(json_response.error);
                    setOrders([]); // Clear orders on error
                }
            }
            catch(error)
            {
                console.log(error);
                setOrders([]); // Clear orders on error
            }
        }
        getOrdersByCategory();
    },[statusFilter]);
  return (
            <>
              <div className='flex flex-row px-2 py-3 justify-evenly mt-3'>
                <button className='bg-green-300 border-black border px-3 py-1' onClick={()=>{setStatusFilter("All")}}>All</button>
                <button className='bg-green-300 border-black border px-3 py-1' onClick={()=>{setStatusFilter("Pending")}}>Pending</button>
                <button className='bg-green-300 border-black border px-3 py-1' onClick={()=>{setStatusFilter("Shipped")}}>Shipped</button>
                <button className='bg-green-300 border-black border px-3 py-1' onClick={()=>{setStatusFilter("Delivered")}}>Delivered</button>
                <button className='bg-green-300 border-black border px-3 py-1' onClick={()=>{setStatusFilter("Cancelled")}}>Cancelled</button>
              </div>
              <div className='flex flex-col p-2'>
                {orders?.map((item)=>{return <SingleOrder userId={item.userId} orderId={item._id} key={item._id} orderStatus={item.orderStatus} orderItems={item.orderItems} orderItemPrice={item.orderItemPrice} orderItemQuantity={item.orderItemQuantity} orderTotalPrice={item.orderTotalPrice}/>})}
                </div>            
            </>
  )
}
