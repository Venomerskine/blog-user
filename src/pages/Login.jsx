import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";


function Login () {
  const navigate = useNavigate();


  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('token', result.token);
        navigate('/dashboard');
      } else {
        alert("Invalid Credentials");
      }

    } catch (error) {
      console.log("Login Error!", error);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
      <h1>Log In</h1>
        <label htmlFor="email">Email: </label>
        <input type='email' id="email" name="email"></input>

        <label htmlFor="password">Password</label>
        <input id="password" name="password"></input>

        <button type="submit">Login</button>
      </form>
      <Link to="/signup">
      <button>Switch to sign up</button>
      </Link>
    </>
  )
}

export default Login