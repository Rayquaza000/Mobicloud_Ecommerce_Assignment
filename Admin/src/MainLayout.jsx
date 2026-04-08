import React from 'react'
import { Header } from './components/Header'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

export const MainLayout = () => {
  const admin = useSelector((state) => state.auth.admin);
  const navigate = useNavigate();

  useEffect(() => {
    // If not logged in and not on login page, redirect to login
    if (!admin && window.location.pathname !== '/adminLogin') {
      navigate('/adminLogin');
    }
  }, [admin, navigate]);

  return (
    <div className='flex flex-col h-screen'>
      <Header/>
      <div className='flex flex-row flex-1'>
        <div className='w-75 bg-green-300 px-2 py-3 border border-black'>
          <span className='text-[18px] font-bold text-black'>Manage:</span>
          <div className='flex flex-col items-center gap-2'>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive
                  ? "text-green-300 bg-green-950 px-3 py-1 rounded w-30 text-center"
                  : "text-black"
              }
            >
              Orders
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-green-300 bg-green-950 px-3 py-1 rounded w-30 text-center"
                  : "text-black"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive
                  ? "text-green-300 bg-green-950 px-3 py-1 rounded w-30 text-center"
                  : "text-black"
              }
            >
              Users
            </NavLink>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}
