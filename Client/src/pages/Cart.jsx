import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetchCartData();
  }, [user]);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ userId: user.userId })
      });
      if (response.ok) {
        const json_response = await response.json();
        setCartData(json_response.userCart);
      }
    } catch (error) {
      console.log("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (itemId, change) => {
    try {
      const response = await fetch("http://localhost:8000/updateCart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: user.userId,
          itemId: itemId,
          update: change > 0 ? "add" : "subtract"
        })
      });
      if (response.ok) {
        fetchCartData();
      }
    } catch (error) {
      console.log("Failed to update quantity:", error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch("http://localhost:8000/removeFromCart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: user.userId,
          itemId: itemId
        })
      });
      if (response.ok) {
        fetchCartData();
      }
    } catch (error) {
      console.log("Failed to remove item:", error);
    }
  };

  if (!user) {
    return <div className='flex flex-1 items-center justify-center'>Please login to view your cart.</div>;
  }

  if (loading) {
    return <div className='flex flex-1 items-center justify-center'>Loading cart...</div>;
  }

  const cart = cartData || user.userCart;
  const { itemIdArray = [], itemsArray = [], priceOfOneUnitArray = [], quantityArray = [] } = cart;

  const total = quantityArray.reduce((sum, qty, index) => sum + qty * priceOfOneUnitArray[index], 0);

  return (
    <div className='flex flex-col flex-1 p-4'>
      <h1 className='text-2xl font-bold mb-4'>Your Cart</h1>
      {itemIdArray.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className='w-full border-collapse border border-gray-300 mb-4'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='border border-gray-300 p-2'>Item</th>
                <th className='border border-gray-300 p-2'>Price</th>
                <th className='border border-gray-300 p-2'>Quantity</th>
                <th className='border border-gray-300 p-2'>Total</th>
                <th className='border border-gray-300 p-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {itemIdArray.map((id, index) => (
                <tr key={id}>
                  <td className='border border-gray-300 p-2'>{itemsArray[index]}</td>
                  <td className='border border-gray-300 p-2'>Rs. {priceOfOneUnitArray[index]}</td>
                  <td className='border border-gray-300 p-2 text-center'>
                    <button className='bg-blue-500 text-white px-2 py-1 mr-1' onClick={() => handleQuantityChange(id, -1)}>−</button>
                    {quantityArray[index]}
                    <button className='bg-blue-500 text-white px-2 py-1 ml-1' onClick={() => handleQuantityChange(id, 1)}>+</button>
                  </td>
                  <td className='border border-gray-300 p-2'>Rs. {quantityArray[index] * priceOfOneUnitArray[index]}</td>
                  <td className='border border-gray-300 p-2 text-center'>
                    <button className='bg-red-500 text-white px-3 py-1' onClick={() => handleRemoveItem(id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='mt-4 text-right'>
            <strong className='text-lg'>Total: Rs. {total}</strong>
          </div>
          <div className='mt-6 flex justify-end gap-4'>
            <button className='bg-green-500 text-white px-6 py-2 rounded' onClick={() => navigate("/checkout", { state: { total, cart } })}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart