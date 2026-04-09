import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../features/auth/authSlice'

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  if (!location.state) {
    return <div className='flex flex-1 items-center justify-center'>No cart data. Please go back to cart.</div>;
  }

  const { total, cart } = location.state;
  const { itemIdArray, itemsArray, priceOfOneUnitArray, quantityArray } = cart;

  const handlePayment = async () => {
    try {
      setPaymentProcessing(true);
      const response = await fetch("https://mobicloud-ecommerce-backend.onrender.com/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: user.userId,
          orderItems: itemsArray,
          orderItemPrice: priceOfOneUnitArray,
          orderItemQuantity: quantityArray,
          orderTotalPrice: total
        })
      });

      if (response.ok) {
        const json_response = await response.json();
        console.log("Order placed:", json_response.message);
        const emptyCart = {
          itemIdArray: [],
          itemsArray: [],
          priceOfOneUnitArray: [],
          quantityArray: []
        };
        const updatedUser = { ...user, userCart: emptyCart };
        dispatch(setUser(updatedUser));
        
        alert("Payment successful! Order placed.");
        navigate("/");
      } else {
        const error_response = await response.json();
        console.log("Payment failed:", error_response.error);
        alert("Payment failed: " + error_response.error);
      }
    } catch (error) {
      console.log("Payment error:", error);
      alert("Payment error. Please try again.");
    } finally {
      setPaymentProcessing(false);
    }
  };

  return (
    <div className='flex flex-col flex-1 p-2 sm:p-4'>
      <h1 className='text-xl sm:text-2xl font-bold mb-4'>Checkout</h1>
      
      <div className='mb-6'>
        <h2 className='text-lg sm:text-xl font-bold mb-2'>Order Summary</h2>
        
        {/* Mobile view - cards */}
        <div className='block sm:hidden space-y-2 mb-4'>
          {itemIdArray.map((id, index) => (
            <div key={id} className='border border-gray-300 p-2 rounded'>
              <div className='font-semibold'>{itemsArray[index]}</div>
              <div className='text-sm'>Price: Rs. {priceOfOneUnitArray[index]} | Qty: {quantityArray[index]} | Total: Rs. {quantityArray[index] * priceOfOneUnitArray[index]}</div>
            </div>
          ))}
        </div>

        {/* Desktop view - table */}
        <table className='hidden sm:table w-full border-collapse border border-gray-300 mb-4'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border border-gray-300 p-2'>Item</th>
              <th className='border border-gray-300 p-2'>Price</th>
              <th className='border border-gray-300 p-2'>Quantity</th>
              <th className='border border-gray-300 p-2'>Total</th>
            </tr>
          </thead>
          <tbody>
            {itemIdArray.map((id, index) => (
              <tr key={id}>
                <td className='border border-gray-300 p-2'>{itemsArray[index]}</td>
                <td className='border border-gray-300 p-2'>Rs. {priceOfOneUnitArray[index]}</td>
                <td className='border border-gray-300 p-2'>{quantityArray[index]}</td>
                <td className='border border-gray-300 p-2'>Rs. {quantityArray[index] * priceOfOneUnitArray[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='text-right'>
          <strong className='text-lg'>Total: Rs. {total}</strong>
        </div>
      </div>

      <div className='mb-6'>
        <h2 className='text-lg sm:text-xl font-bold mb-2'>Shipping Address</h2>
        <div className='border border-gray-300 p-4 bg-gray-50'>
          <p><strong>Name:</strong> {user.userName}</p>
          <p><strong>Email:</strong> {user.userEmail}</p>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-4'>
        <button 
          className='bg-blue-500 text-white px-6 py-2 rounded order-2 sm:order-1'
          onClick={() => navigate("/cart")}
        >
          Back to Cart
        </button>
        <button 
          className='bg-green-500 text-white px-6 py-2 rounded disabled:opacity-50 order-1 sm:order-2'
          onClick={handlePayment}
          disabled={paymentProcessing}
        >
          {paymentProcessing ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  )
}

export default Checkout
