import { Link } from "react-router-dom"


function Login () {
  const handleSignup = async (event) => {
    event.preventDefault();

  }

  return (
    <>
      <form>
      <h1>Log to your account</h1>
        <label htmlFor="email">Email: </label>
        <input type='email' id="email"></input>
      </form>
      <Link to="/signup">
      <button>Switch to sign up</button>
      </Link>
    </>
  )
}

export default Login