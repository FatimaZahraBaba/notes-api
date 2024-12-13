import React from 'react'
import './style.scss'

function Input({type, img, value, handleChange, placeholder}) {
  return (
    <div className='div-input'>
        <img src={img} />
        <input type={type} value={value} onChange={handleChange} placeholder={placeholder}/>
    </div>
  )
}

export default Input