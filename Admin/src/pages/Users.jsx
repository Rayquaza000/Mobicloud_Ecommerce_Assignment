import React, { useState } from 'react'
import { SingleUser } from '../components/SingleUser.jsx';
import { useEffect } from 'react';
export const Users = () => {

  const [users,setUsers]=useState([]);
  useEffect(()=>{
    async function getAllUsers(){
      try{
        const response=await fetch("https://mobicloud-ecommerce-backend.onrender.com/allUsers", {
          credentials: 'include'
        });
        if(response.ok)
        {
          const json_response=await response.json();
          setUsers(json_response.users || []);
        }
        else{
          const json_response=await response.json();
          console.log(json_response.error);
          setUsers([]);
        }
      }
      catch(error)
      {
        console.log(error);
        setUsers([]);
      }
    }
    getAllUsers();
  },[])
  return (
    <>
      {/* Mobile view - cards */}
      <div className='block sm:hidden p-2 space-y-4'>
        {users.map((item)=>{
          return(<SingleUser key={item._id} name={item.userName} email={item.userEmail} id={item._id}/>)
        })}
      </div>

      {/* Desktop view - table */}
      <table className='hidden sm:table w-full border-collapse border border-gray-300'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='border border-gray-300 p-2'>UserID</th>
            <th className='border border-gray-300 p-2'>User Name</th>
            <th className='border border-gray-300 p-2'>User Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item)=>{
            return(<SingleUser key={item._id} name={item.userName} email={item.userEmail} id={item._id}/>)
          })}
        </tbody>
      </table>
    </>
  )
}
