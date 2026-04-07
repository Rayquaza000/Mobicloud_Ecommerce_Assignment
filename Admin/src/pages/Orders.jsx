import React from 'react'

export const Orders = () => {
  return (
    <div className="flex flex-col flex-1">
              <div className='flex flex-row px-2 py-3 justify-evenly mt-3'>
                <button className='bg-green-300 border-black border px-3 py-1'>All</button>
                <button className='bg-green-300 border-black border px-3 py-1'>Pending</button>
                <button className='bg-green-300 border-black border px-3 py-1'>Shipped</button>
                <button className='bg-green-300 border-black border px-3 py-1'>Delivered</button>
                <button className='bg-green-300 border-black border px-3 py-1'>Cancelled</button>
              </div>
        </div>
  )
}
