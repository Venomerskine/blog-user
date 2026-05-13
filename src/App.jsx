import { useEffect, useState } from 'react'
import './App.css'

function SignUp() {
  return (
    <>
      <form>
        <label for = "firstName">First Name</label>
        <input name='firstName' id='firstName'></input>

        <label for = "lastName">Last Name</label>
        <input name='lastName' id='lastName'></input>

        <label for = "email">Email</label>
        <input name='email' id='email'></input>

        <label for = "password">Password</label>
        <input name='password' id='password'></input>
      </form>
    </>
  )
}

function Login () {

  return (
    <>
      <form>
        <label>Email: </label>
        <input type='email'></input>
      </form>
    </>
  )
}

function App() {
  
  return (
    <>
      <Login />
       
    </>
  )
}

export default App
