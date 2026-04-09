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
      <div className='flex flex-col sm:flex-row flex-1'>
        <div className='w-full sm:w-64 bg-green-300 px-2 py-3 border border-black order-2 sm:order-1'>
          <span className='text-sm sm:text-[18px] font-bold text-black'>Manage:</span>
          <div className='flex flex-row sm:flex-col items-center sm:items-start gap-2 sm:gap-0'>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive
                  ? "text-green-300 bg-green-950 px-2 sm:px-3 py-1 rounded w-full sm:w-auto text-center"
                  : "text-black w-full sm:w-auto text-center"
              }
            >
              Orders
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-green-300 bg-green-950 px-2 sm:px-3 py-1 rounded w-full sm:w-auto text-center"
                  : "text-black w-full sm:w-auto text-center"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive
                  ? "text-green-300 bg-green-950 px-2 sm:px-3 py-1 rounded w-full sm:w-auto text-center"
                  : "text-black w-full sm:w-auto text-center"
              }
            >
              Users
            </NavLink>
          </div>
        </div>
        <div className="flex flex-col flex-1 order-1 sm:order-2">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}
