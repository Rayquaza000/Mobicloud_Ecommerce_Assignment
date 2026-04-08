import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"

const Signup = () => {
    const navigate=useNavigate();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    async function handleSignup(){
        try{
            const options={
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    newUserName:name,
                    newUserEmail:email,
                    password:password
                })
            }
            const response=await fetch("https://mobicloud-ecommerce-backend.onrender.com/signup",options);
            if(response.ok)
            {
                const json_response = await response.json();
                console.log(json_response.message);
                navigate("/login");
            }
            else{
                const error_response = await response.json();
                console.log("Signup failed:", error_response.error);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }
    return (
    <div className='flex flex-col flex-1'>
        <span>Signup</span>
        <label>Name:</label>
        <input type="text" className='border border-black' value={name} onChange={(e)=>{setName(e.target.value)}}></input>
        <label>Email:</label>
        <input type="email" className='border border-black' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
        <label>Password:</label>
        <input type="password" className='border border-black' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
        <button onClick={handleSignup}>Signup</button>
        <span>Already a user?</span>
        <span onClick={() => navigate("/login")}>Login</span>
    </div>
  )
}

export default Signup
