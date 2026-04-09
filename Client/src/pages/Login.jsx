import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import {useNavigate} from "react-router-dom";


const Login = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  async function handleLogin(){
    try{
      const options={
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          userEmail:email,
          password:password
        })
      }
      const response=await fetch("https://mobicloud-ecommerce-backend.onrender.com/login",options);
      if(response.ok)
      {
        const json_response=await response.json();
        console.log(json_response.message);
        dispatch(setUser({ userId: json_response.userId,userName:json_response.userName, userEmail:json_response.userEmail, userCart:json_response.userCart }));
        navigate("/");
      }
      else{
        const error_response = await response.json();
        console.log("Login failed:", error_response.error);
      }
    }
    catch(error)
    {
      console.log(error);
    }
  }
  return (
    <div className='flex flex-col flex-1 items-center justify-center px-4'>
      <span className='text-xl sm:text-2xl mb-4'>Login</span>
      <div className='w-full max-w-sm'>
        <label className='block mb-2 text-sm sm:text-base'>Email:</label>
        <input type="email" placeholder="email" className='border border-black pl-1 w-full mb-4 p-2' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
        <label className='block mb-2 text-sm sm:text-base'>Password:</label>
        <input type="password" placeholder="******" className='border border-black pl-1 w-full mb-4 p-2' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
        <button className='border border-black w-full p-2 mb-4' onClick={handleLogin}>Login</button>
        <div className='text-center'>
          <span className='text-sm sm:text-base'>New User?</span><br/>
          <span className='text-blue-600 cursor-pointer text-sm sm:text-base' onClick={()=>{navigate("/signup")}}>Signup</span>
        </div>
      </div>
    </div>
  )
}

export default Login