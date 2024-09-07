import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  let navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(process.env.URL,process.env.usernamee);
    const response = await fetch(`https://inotebook-12.onrender.com/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json()
  
    if (json.success) {
      // save the authtoken and redirect
     
      localStorage.setItem('token', json.authToken)
      props.showAlert("Login Successful", "success")
      navigate('/')
    }
    else {
      props.showAlert("Invalid credentials", "danger")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    
  }
  return (
    <>
    <div className='container mt-3'>
    <h1 className='my-4'>Login to continue iNoteBook</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} name='password' id="password" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
      </div>
    </>
  )
}
export default Login
