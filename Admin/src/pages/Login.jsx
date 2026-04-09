import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { setAdmin } from '../features/auth/authSlice.js';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const dispatch=useDispatch();
    const [message,setMessage]=useState("")
    const admin=useSelector((state)=>state.auth.admin);
    const navigate=useNavigate();
    async function handleLogin()
    {
        try{
            const response=await fetch("https://mobicloud-ecommerce-backend.onrender.com/adminLogin", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({adminEmail: email, adminPassword: password}),
                credentials: 'include'
            });
            if(response.ok)
            {
                const json_response=await response.json();
                dispatch(setAdmin(json_response.adminName))
                setTimeout(()=>{navigate("/orders")},3000)
            }
            else{
                const json_response1=await response.json();
                console.log(json_response1.error);
                setMessage(json_response1.error);
                setTimeout(()=>{setMessage("")},3000);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }
  return (
     <div className='flex flex-col items-center justify-center min-h-screen px-4 py-8'>
        { !admin ? (
          <div className='w-full max-w-sm bg-white p-6 border border-gray-300 rounded shadow-sm'>
            <h1 className='text-2xl font-bold mb-4 text-center'>Login</h1>
            <label className='block mb-2 text-sm sm:text-base'>Email:</label>
            <input type="email" placeholder='Email' className='pl-2 border border-black w-full py-2 mb-4' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <label className='block mb-2 text-sm sm:text-base'>Password:</label>
            <input type="password" placeholder="Password" className='pl-2 border border-black w-full py-2 mb-4' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            <button className='border border-black px-4 py-2 w-full bg-blue-600 text-white' onClick={handleLogin}>Login</button>
            {message && <div className='mt-4 text-red-600 text-sm'>{message}</div>}
          </div>
        ) : (
          <span className='text-center'>You have logged in as {admin}</span>
        )}
    </div>
  )
}

export default Login