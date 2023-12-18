import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import LayMain from './layouts/LayMain'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {

  return (
    <Routes>
      <Route
      element={<LayMain/>}
      >
        <Route
        path='/'
        element={<Home/>}
        >
        </Route>

        <Route
        path='/register'
        element={<Register/>}
        >
        </Route>

        <Route
        path='/login'
        element={<Login/>}
        >
        </Route>
      </Route>

    </Routes>
  )
}

export default App
