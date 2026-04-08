import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import { setAdmin, logout } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const admin=useSelector((state)=>state.auth.admin);
    async function handleLogging(){
        try{
            if(admin)
            {
                const response=await fetch("https://mobicloud-ecommerce-backend.onrender.com/logout");
                if(response.ok)
                {
                    console.log(await response.json().message)
                }
                dispatch(logout())
            }
            else{
                navigate("/adminLogin");
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }
    return (
    <div className='flex flex-row items-center p-3 border-b border-black justify-evenly'>
        <div className='flex flex-col items-center bg-blue-950 text-white p-3 text-[20px]'>
            <div className='flex flex-row'>
                <span className='text-blue-600'>Mobi</span>
                <span>cloud</span>
            </div>
            <span>Ecommerce</span>
            <span>Assignment</span>
        </div>
        <div className='text-[30px] font-extrabold'>
            <span className='text-green-950'>Admin</span>
            <span className='text-green-600'>Panel</span>
        </div>
        <button className='text-[18px] border-2 border-red-700 text-red-700 rounded-[7px] px-3 py-2' onClick={handleLogging}>{admin?"Logout":"Login"}</button>
    </div>
  )
}
