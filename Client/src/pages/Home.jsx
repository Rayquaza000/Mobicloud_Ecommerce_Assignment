import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
import FilterButton from '../components/FilterButton';
import { useSearchParams } from 'react-router-dom';

const Home = () => {

const [searchParams] = useSearchParams();
const searchQuery = searchParams.get('search') || '';
const [category,setCategory]=useState("All");
const [products,setProducts]=useState(null);
const [filteredProducts,setFilteredProducts]=useState(null);
const [categories,setCategories]=useState([]);

useEffect(()=>{
    async function fetchProductsByCategory(){
    try{
        const response=await fetch("http://localhost:8000/products/"+category);

        const json_response=await response.json();
        setProducts(json_response.products || []);
    }
    catch(error)
    {
        console.log(error);
    }
}
fetchProductsByCategory();
},[category])

useEffect(()=>{
    if (!products?.length) {
        setFilteredProducts([]);
        return;
    }
    const temp = ["All", ...new Set(products.map((product) => product.productCategory))];
    setCategories(temp);
},[products])

useEffect(()=>{
    if (!products?.length) return;
    
    let filtered = products;
    if(searchQuery.trim()){
        const lowerQuery = searchQuery.toLowerCase();
        filtered = products.filter((product) => 
            product.productName.toLowerCase().includes(lowerQuery) ||
            product.productCategory.toLowerCase().includes(lowerQuery)
        );
    }
    
    setFilteredProducts(filtered);
}, [products, searchQuery])

  return (
    <div className="flex-1 flex-col">
        <div className='flex flex-col'>
            <span>Filters:</span>
            <span>By category:</span>
            <div className='flex flex-row'>
                {categories?.map((item, index) => category == item ? (
                    <FilterButton key={index} cat={item} setCategory={setCategory} colour="bg-blue-700 text-white" />
                ) : (
                    <FilterButton key={index} cat={item} setCategory={setCategory} colour="bg-white text-black" />
                ))}
            </div>
        </div>
        <hr className='border border-white'></hr>
        <div className='flex flex-col'>
            <span>{searchQuery ? `Search: ${searchQuery}` : category}</span>
            <div className='flex flex-wrap justify-evenly mt-2'>
                {filteredProducts?.length > 0 ? (
                    filteredProducts.map((item)=>{return(<ProductCard key={item._id} id={item._id} imgsrc={item.productImage}  productName={item.productName} productPrice={item.productPrice} productCategory={item.productCategory} productDescription={item.productDescription}/>)})
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default Home