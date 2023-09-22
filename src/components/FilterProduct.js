import React from 'react'
import {PiForkKnife} from 'react-icons/pi'
function FilterProduct({category,click , isActive}) {
  return (
    <div onClick={click}>
    <div className={`text-3xl p-5  rounded-full cursor-pointer ${isActive ?"bg-yellow-300":"bg-yellow-500" }`}>
        
        <PiForkKnife/>
        
    </div>
    <p className='text-center font-medium my-1 capitalize'>{category}</p>
    </div>
  )
}

export default FilterProduct