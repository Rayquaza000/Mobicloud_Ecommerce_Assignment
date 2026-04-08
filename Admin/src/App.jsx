import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {RouterProvider} from "react-router-dom"
import { createBrowserRouter } from 'react-router-dom'
import {MainLayout} from "./MainLayout.jsx";
import { Orders } from './pages/Orders.jsx'
import { Products } from './pages/Products.jsx'
import { Users } from './pages/Users.jsx'
import Login from './pages/Login.jsx'
import { NewProduct } from './pages/NewProduct.jsx'
import { useSelector } from 'react-redux';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const admin = useSelector((state) => state.auth.admin);
  
  if (!admin) {
    return <Login />;
  }
  
  return children;
};

function App() {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<MainLayout/>,
      children:[
        {
          path:"/orders",
          element:<ProtectedRoute><Orders/></ProtectedRoute>
        },
        {
          path:"/products",
          element:<ProtectedRoute><Products/></ProtectedRoute>
        },
        {
          path:"/users",
          element:<ProtectedRoute><Users/></ProtectedRoute>
        },
        {
          path:"/newProduct",
          element:<ProtectedRoute><NewProduct/></ProtectedRoute>
        },
        {
          path:"/adminLogin",
          element:<Login/>
        }
      ]
    }
  ]);
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
