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
                    const response=await fetch("http://localhost:8000/logout");
                    if(response.ok)
                    {
                        console.log(await response.json().message)
                        dispatch(setUser(null));
                        navigate("/");
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
    <header className='flex flex-row p-6 text-2xl font-bold text-white items-center'>
        <div className='flex flex-col'>
            <div className='flex flex-row'>
                <span className='text-[#17375E]'>Mobi</span>
                <span>Cloud</span>
            </div>
            <span>E-commerce</span>
            <span>Assignment</span>
        </div>

        <div className='flex flex-row mx-auto'>
        <input 
          type="text" 
          placeholder="Search by title or category" 
          className='border border-black bg-[#f2f2f2] text-black text-[18px] pl-1.5 w-100'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className='bg-[#f2f2f2] text-black text-[18px] p-1.5 border-black border'
          onClick={handleSearch}
        >
          Search
        </button>
        </div>
        <div className="flex flex-row justify-evenly items-center bg-blue-500 p-1 border border-black text-[20px] font-normal">
            <button className='border border-black text-black font-normal bg-gray-400 m-1 p-1' onClick={handleLogging}>{user?"Logout":"Login"}</button>
            <div className='bg-blue-800 border border-blue-950 m-1 p-1'>{user?user.userName:"Profile"}</div>
            <div className='bg-blue-800 border border-blue-950 m-1 p-1' onClick={openCart}>Cart</div>
        </div>
    </header>

  )
}

export default Header