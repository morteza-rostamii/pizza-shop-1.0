import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'

const LayMain = () => {
  return (
    <main>
      <Header/>
      <Outlet/>
    </main>
  )
}

export default LayMain