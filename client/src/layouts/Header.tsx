import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header 
    
    className='
    flex gap-4
    bg-red-100'>
      <Link to={'/'}>home</Link>
      <Link to={'/register'}>register</Link>
      <Link to={'/login'}>login</Link>
    </header>
  )
}

export default Header