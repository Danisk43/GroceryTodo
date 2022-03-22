import React from 'react'

const GroceryInput = ({handleChange,str,handleClick}) => {
  
  return (
    <>
    <input value={str} type="text" placeholder="ADD ITEMS" onChange={handleChange}/>
    <button onClick={handleClick}>ADD</button>
    </>
  )
}

export default GroceryInput