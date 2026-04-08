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
                dispatch(setAdmin({admin:json_response.adminName}))
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
     <div className='flex flex-col items-center'>
        { !admin ? (<><span>Login</span>
        <label>Email:</label>
        <input type="email" placeholder='Email' className='pl-1 border border-black' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
        <label className='mt-3'>Password:</label>
        <input type="password" placeholder="Password" className='pl-1 border border-black' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
        <button className='border border-black px-3 py-1 mt-3' onClick={handleLogin}>Login</button>
        <span>{message}</span>
        </>
        ):
        (admin && <span>You have logged in as {admin}</span>)}
    </div>
    
  )
}

export default Login