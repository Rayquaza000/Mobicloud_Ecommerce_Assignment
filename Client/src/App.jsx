import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import MainLayout from './MainLayout.jsx'
import { RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { createBrowserRouter } from 'react-router-dom'
import {SingleProduct} from "./pages/SingleProduct.jsx"
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'

function App() {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<MainLayout/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/product/:id",
          element:<SingleProduct/>
        },
        {
          path:"/signup",
          element:<Signup/>
        },
        {
          path:"/cart",
          element:<Cart/>
        },
        {
          path:"/checkout",
          element:<Checkout/>
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
