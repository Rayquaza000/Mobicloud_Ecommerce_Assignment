import React, { useEffect } from 'react'
import { SingleProduct } from '../components/SingleProduct.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export const Products = () => {
    const [products,setProducts]=useState([]);
    const [updateList,setUpdateList]=useState(false);
    const navigate=useNavigate();
    useEffect(()=>{
        async function getAllProducts(){
            try{
                const response=await fetch("https://mobicloud-ecommerce-backend.onrender.com/products");
                if(response.ok)
                {
                    const json_response=response.json();
                    setProducts(json_response.products);
                }
            }
            catch(error)
            {
                console.log(error);
            }
        }
        getAllProducts();
    },[updateList])
    function handleNewProduct(){
        navigate("/newProduct");
    }
  return (
    <>
        <div className='flex flex-row '>
            <button onClick={handleNewProduct}>+New Product</button>
            
        </div>
        <div className='flex flex-col flex-1'>
            <table>
                <thead>
                    <tr>
                        <th>ProductID</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Available Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map(item=>{return <SingleProduct key={item._id} productName={item.productName} productQuantity={item.productQuantity} productPrice={item.productPrice} productCategory={item.productCategory} updateList={updateList} setUpdateList={setUpdateList}/>})}
                </tbody>
            </table>
        </div>
    </>
  )
}
