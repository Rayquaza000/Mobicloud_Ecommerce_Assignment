import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';

const Home = () => {

const [category,setCategory]=useState("All");
useEffect(()=>{
    try{
        const response=fetch("https://localhost")
    }
    catch(error)
    {
        console.log(error);
    }
},[category])
  return (
    <div className="flex-1 flex-col">
        <div className='flex flex-col'>
            <span>Filters:</span>
            <span>By category:</span>
            <div className='flex flex-row'>

            </div>
        </div>
        <hr className='border border-white'></hr>
        <div className='flex flex-col'>
            <span>{category}</span>
            <div className='flex flex-wrap justify-evenly'>
                <ProductCard/>
            </div>
        </div>
    </div>
  )
}

export default Home