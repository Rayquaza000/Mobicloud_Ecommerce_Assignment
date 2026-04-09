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
                const response=await fetch("https://mobicloud-ecommerce-backend.onrender.com/products", {
                    credentials: 'include'
                });
                if(response.ok)
                {
                    const json_response=await response.json();
                    setProducts(json_response.products || []);
                }
                else
                {
                    const json_response=await response.json();
                    console.log(json_response.error);
                    setProducts([]);
                }
            }
            catch(error)
            {
                console.log(error);
                setProducts([]);
            }
        }
        getAllProducts();
    },[updateList])
    function handleNewProduct(){
        navigate("/newProduct");
    }
  return (
    <>
        <div className='flex flex-col sm:flex-row p-2 sm:p-4'>
            <button onClick={handleNewProduct} className='mb-4 sm:mb-0 sm:mr-4 bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto'>+New Product</button>
        </div>
        <div className='flex flex-col flex-1 p-2 sm:p-4'>
            {/* Mobile view - cards */}
            <div className='block sm:hidden space-y-4'>
                {products?.map(item => (
                    <SingleProduct key={item._id} productId={item._id} productName={item.productName} productQuantity={item.productQuantity} productPrice={item.productPrice} productCategory={item.productCategory} productImage={item.productImage} productDescription={item.productDescription} updateList={updateList} setUpdateList={setUpdateList}/>
                ))}
            </div>

            {/* Desktop view - table */}
            <table className='hidden sm:table w-full border-collapse border border-gray-300'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='border border-gray-300 p-2'>ProductID</th>
                        <th className='border border-gray-300 p-2'>Product Image</th>
                        <th className='border border-gray-300 p-2'>Product Name</th>
                        <th className='border border-gray-300 p-2'>Category</th>
                        <th className='border border-gray-300 p-2'>Price</th>
                        <th className='border border-gray-300 p-2'>Available Quantity</th>
                        <th className='border border-gray-300 p-2'>Description</th>
                        <th className='border border-gray-300 p-2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map(item=>{return <SingleProduct key={item._id} productId={item._id} productName={item.productName} productQuantity={item.productQuantity} productPrice={item.productPrice} productCategory={item.productCategory} productImage={item.productImage} productDescription={item.productDescription} updateList={updateList} setUpdateList={setUpdateList}/>})}
                </tbody>
            </table>
        </div>
    </>
  )
}
