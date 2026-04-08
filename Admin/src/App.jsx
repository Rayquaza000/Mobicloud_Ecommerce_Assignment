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

function App() {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<MainLayout/>,
      children:[
        {
          path:"/orders",
          element:<Orders/>
        },
        {
          path:"/products",
          element:<Products/>
        },
        {
          path:"/users",
          element:<Users/>
        },
        {
          path:"/adminLogin",
          element:<Login/>
        },
        {
          path:"/newProduct",
          element:<NewProduct/>
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
