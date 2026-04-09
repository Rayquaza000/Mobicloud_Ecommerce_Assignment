import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
import FilterButton from '../components/FilterButton';
import { useSearchParams } from 'react-router-dom';

const Home = () => {

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // ✅ Fetch ALL products once (for categories + default view)
  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const res = await fetch("https://mobicloud-ecommerce-backend.onrender.com/products/All");
        const data = await res.json();

        const allProducts = data.products || [];

        setProducts(allProducts);
        setFilteredProducts(allProducts);

        const uniqueCategories = [
          "All",
          ...new Set(allProducts.map(p => p.productCategory))
        ];

        setCategories(uniqueCategories);

      } catch (err) {
        console.log(err);
      }
    }

    fetchAllProducts();
  }, []);

  // ✅ Handle category filtering (frontend side)
  useEffect(() => {
    if (!products.length) return;

    if (category === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.productCategory === category
      );
      setFilteredProducts(filtered);
    }
  }, [category, products]);

  // ✅ Handle search filtering
  useEffect(() => {
    if (!products.length) return;

    let base =
      category === "All"
        ? products
        : products.filter(p => p.productCategory === category);

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      base = base.filter((product) =>
        product.productName.toLowerCase().includes(lowerQuery) ||
        product.productCategory.toLowerCase().includes(lowerQuery)
      );
    }

    setFilteredProducts(base);

  }, [searchQuery, category, products]);

  return (
    <div className="flex flex-col flex-1 px-2 sm:px-4">

      {/* Filters */}
      <div className='flex flex-col mb-4'>
        <span>Filters:</span>
        <span>By category:</span>

        <div className='flex flex-wrap gap-2'>
          {categories.map((item, index) => (
            <FilterButton
              key={index}
              cat={item}
              setCategory={setCategory}
              colour={
                category === item
                  ? "bg-blue-700 text-white"
                  : "bg-white text-black"
              }
            />
          ))}
        </div>
      </div>

      <hr className='border border-white mb-4' />

      {/* Products */}
      <div className='flex flex-col'>
        <span className='mb-2'>
          {searchQuery ? `Search: ${searchQuery}` : category}
        </span>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductCard
                key={item._id}
                id={item._id}
                imgsrc={item.productImage}
                productName={item.productName}
                productPrice={item.productPrice}
                productCategory={item.productCategory}
                productDescription={item.productDescription}
              />
            ))
          ) : (
            <p className='col-span-full text-center'>No products found.</p>
          )}
        </div>
      </div>

    </div>
  )
}

export default Home