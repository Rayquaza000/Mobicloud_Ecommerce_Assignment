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
    <div className='flex flex-col flex-1 items-center justify-center px-4'>
        <span className='text-xl sm:text-2xl mb-4'>Signup</span>
        <div className='w-full max-w-sm'>
            <label className='block mb-2 text-sm sm:text-base'>Name:</label>
            <input type="text" className='border border-black w-full mb-4 p-2' value={name} onChange={(e)=>{setName(e.target.value)}}></input>
            <label className='block mb-2 text-sm sm:text-base'>Email:</label>
            <input type="email" className='border border-black w-full mb-4 p-2' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
            <label className='block mb-2 text-sm sm:text-base'>Password:</label>
            <input type="password" className='border border-black w-full mb-4 p-2' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            <button className='w-full p-2 mb-4 border border-black' onClick={handleSignup}>Signup</button>
            <div className='text-center'>
                <span className='text-sm sm:text-base'>Already a user?</span><br/>
                <span className='text-blue-600 cursor-pointer text-sm sm:text-base' onClick={() => navigate("/login")}>Login</span>
            </div>
        </div>
    </div>
  )
}

export default Signup
