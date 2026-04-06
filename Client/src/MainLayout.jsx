import React from 'react'
import Header from './components/Header.jsx'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="bg-[#B9CDE5] flex flex-col min-h-screen">
        <Header/>
        <hr className='border border-white'></hr>
        <div>
            <span>/Home</span>
        </div>
        <hr className='border border-white'></hr>
        <Outlet />
    </div>
  )
}

export default MainLayout