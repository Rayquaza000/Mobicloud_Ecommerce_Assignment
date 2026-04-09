import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { setUser } from '../features/auth/authSlice.js'
const Header = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const user=useSelector((state) => state.auth.user);
    const [searchQuery, setSearchQuery] = useState("");

    function openCart(){
        if(user)
        {
            navigate("/cart");
        }
    }
    
    function handleSearch(){
        if(searchQuery.trim()){
            navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
        }
        else{
            navigate("/");
        }
    }

    function handleKeyPress(e){
        if(e.key === "Enter"){
            handleSearch();
        }
    }

    function handleLogging(){
        if(user)
        {
            async function tryLoggingOut()
            {
                try{
                    const response=await fetch("https://mobicloud-ecommerce-backend.onrender.com/logout");
                    if(response.ok)
                    {
                        console.log(await response.json().message)
                        dispatch(setUser(null));
                        navigate("/");
                    }
                    else{
                        console.log("Server response not ok")
                    }
                }
                catch(error)
                {
                    console.log(error);
                }
            }
            tryLoggingOut();
        }
        else{
            navigate("/login");
        }
    }
    return (
    <header className='flex flex-col sm:flex-row p-2 sm:p-6 text-lg sm:text-2xl font-bold text-white items-center gap-2 sm:gap-0'>
        <div className='flex flex-col text-center sm:text-left'>
            <div className='flex flex-row justify-center sm:justify-start'>
                <span className='text-[#17375E]'>Mobi</span>
                <span>Cloud</span>
            </div>
            <span>E-commerce</span>
            <span>Assignment</span>
        </div>

        <div className='flex flex-col sm:flex-row mx-auto w-full sm:w-auto gap-2'>
        <input 
          type="text" 
          placeholder="Search by title or category" 
          className='border border-black bg-[#f2f2f2] text-black text-sm sm:text-[18px] pl-1.5 w-full sm:w-80'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className='bg-[#f2f2f2] text-black text-sm sm:text-[18px] p-1.5 border-black border w-full sm:w-auto'
          onClick={handleSearch}
        >
          Search
        </button>
        </div>
        <div className="flex flex-row justify-center sm:justify-evenly items-center bg-blue-500 p-1 border border-black text-sm sm:text-[20px] font-normal w-full sm:w-auto">
            <button className='border border-black text-black font-normal bg-gray-400 m-1 p-1 text-xs sm:text-sm' onClick={handleLogging}>{user?"Logout":"Login"}</button>
            <div className='bg-blue-800 border border-blue-950 m-1 p-1 text-xs sm:text-sm'>{user?user.userName:"Profile"}</div>
            <div className='bg-blue-800 border border-blue-950 m-1 p-1 text-xs sm:text-sm' onClick={openCart}>Cart</div>
        </div>
    </header>

  )
}

export default Header