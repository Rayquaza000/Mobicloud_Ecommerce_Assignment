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
      <table>
        <thead>
          <tr>
            <th>UserID</th>
            <th>User Name</th>
            <th>User Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item)=>{
            return(<SingleUser key={item._id} name={item.userName} email={item.userEmail}/>)
          })}
        </tbody>
      </table>
    </>
  )
}
