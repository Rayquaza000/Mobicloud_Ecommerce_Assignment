import React, { useState } from 'react'
import { SingleUser } from '../components/SingleUser.jsx';

export const Users = () => {

  const [users,setUsers]=useState([]);
  useEffect(()=>{
    async function getAllUsers(){
      try{
        const response=await fetch("http://localhost:8000/allUsers");
        if(response.ok)
        {
          const json_response=await response.json();
          setUsers(json_response.users);

        }
        else{
          console.log("Users fetching failed");
        }
      }
      catch(error)
      {
        console.log(error);
      }
    }
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
