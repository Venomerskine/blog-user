import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Signup() {
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    // Create an object from the form fields
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });

      if (response.ok) {
        navigate('/login'); //Send them to login on success
      }
      console.log("Succesful Signup")

    } catch (error){
      console.error("Signup Failed", error)
    }
  }

  return (
    <>
      <form onSubmit={handleSignup}>
        <h1>Create Account</h1>

        <label htmlFor = "firstName">First Name</label>
        <input name='firstName' id='firstName'></input>

        <label htmlFor = "lastName">Last Name</label>
        <input name='lastName' id='lastName'></input>

        <label htmlFor = "email">Email</label>
        <input name='email' id='email'></input>

        <label htmlFor = "password">Password</label>
        <input name='password' id='password'></input>

        <button type="submit">Sign Up</button>
      </form>

      <Link to="/login">
      <button>Switch to login</button>
      </Link>
    </>
  )
}

export default Signup