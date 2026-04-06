import React from 'react'

const Header = () => {
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
        <input type="text" placeholder="Search by title" className='border border-black bg-[#f2f2f2] text-black text-[18px] pl-1.5 w-100'></input>
        <button className='bg-[#f2f2f2] text-black text-[18px] p-1.5 border-black border'>Search</button>
        </div>
        <div className="flex flex-row justify-evenly items-center bg-blue-500 p-1 border border-black text-[20px] font-normal">
            <button className='border border-black text-black font-normal bg-gray-400 m-1 p-1'>Login</button>
            <div className='bg-blue-800 border border-blue-950 m-1 p-1'>Profile</div>
            <div className='bg-blue-800 border border-blue-950 m-1 p-1'>Cart</div>
        </div>
    </header>

  )
}

export default Header