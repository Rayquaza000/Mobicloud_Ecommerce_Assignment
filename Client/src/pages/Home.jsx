import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
import FilterButton from '../components/FilterButton';

const Home = () => {

const [category,setCategory]=useState("All");
const [products,setProducts]=useState(null);
const [categories,setcategories]=useState([]);
useEffect(()=>{
    async function fetchProductsByCategory(){
    try{
        const response=await fetch("http://localhost:8000/products/"+category);

        const json_response=await response.json();
        setProducts(json_response.products);
    }
    catch(error)
    {
        console.log(error);
    }
}
fetchProductsByCategory();
},[category])

useEffect(()=>{
    products?.forEach(element => {
        setcategories([...categories,element.productCategory]);
        console.log(categories);
    });
},[products])

  return (
    <div className="flex-1 flex-col">
        <div className='flex flex-col'>
            <span>Filters:</span>
            <span>By category:</span>
            <div className='flex flex-row'>
                {categories?.map((item,index)=>{return(<FilterButton key={index} cat={item}/>)})}
            </div>
        </div>
        <hr className='border border-white'></hr>
        <div className='flex flex-col'>
            <span>{category}</span>
            <div className='flex flex-wrap justify-evenly'>
                {products?.map((item)=>{return(<ProductCard key={item._id} imgsrc={item.productImage} />)})}
                
            </div>
        </div>
    </div>
  )
}

export default Home