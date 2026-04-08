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
    <div className='flex flex-col flex-1 items-center'>
      <span>Login</span>
      <label>Email:</label>
      <input type="email" placeholder="email" className='border border-black pl-1' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
      <label>Password:</label>
      <input type="password" placeholder="******" className='border border-black pl-1' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
      <button className='border border-black' onClick={handleLogin}>Login</button>
      <span>New User?</span>
      <span onClick={()=>{navigate("/signup")}}>Signup</span>
    </div>
  )
}

export default Login