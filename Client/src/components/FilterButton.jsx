import React from 'react'

const FilterButton = ({cat}) => {
  return (
    <div className='flex flex-row items-center justify-center bg-blue-700 text-white border border-blue-950 p-1 px-2'>{cat}</div>
  )
}

export default FilterButton