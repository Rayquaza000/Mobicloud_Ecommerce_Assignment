import React from 'react'

const FilterButton = ({cat,setCategory,colour}) => {
  const className="flex flex-row items-center justify-center border border-blue-950 p-1 px-2 "+colour;
  return (
    <div className={className} onClick={() => setCategory(cat)}>{cat}</div>
  )
}

export default FilterButton