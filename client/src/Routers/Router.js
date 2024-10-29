import React from 'react'
import  {BrowserRouter ,Route, Routes} from 'react-router-dom'
import Navbar from '../Components/Navbar'
import About from '../Screens/About'
import Home from '../Screens/Home'
import Contact from '../Screens/Contact'
import Products from '../Screens/Products'
import Login from '../Components/Login'
import Register from '../Components/Register'
import DetailP from '../Screens/DetailP'
import ProtectedRoute from './ProtectedRoute'
import Users from '../Screens/Users'
import Update from '../Components/Update'
const Router = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route element={<ProtectedRoute/>}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<DetailP />} />
      <Route path="/users" element={<Users />} />
      <Route path="/edit/:id" element={<Update />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default Router