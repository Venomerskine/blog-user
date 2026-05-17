// import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/protectedRoute'



function App() {

  // const [isLogin, setIsLogin] = useState(true);

  // function togleView() {
  //   setIsLogin(prev => !prev)
  // }
  return (
    <Routes>

    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>

    <Route
     path='/dashboard' 
     element={
      <ProtectedRoute>
     <Dashboard/>
      </ProtectedRoute>
     } />

    </Routes>
  )
}

export default App
