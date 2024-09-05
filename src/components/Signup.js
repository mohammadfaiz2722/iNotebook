import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const navigate=useNavigate();
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
  const onChange=(e)=>
  {
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  const handleSubmit= async (e)=>
  {
    e.preventDefault();
      const {name,email,password}=credentials;
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }, 
          body:JSON.stringify({name,email,password})
        });
const json=await response.json();

if(json.success)
{

  localStorage.setItem('token', json.authToken)

  navigate('/');
  props.showAlert("Account created successfully","success");
}
else{
 
  props.showAlert("Invalid credentials","danger")
}
      }
  return (
    <div className="container mt-2">
    <h1 className='my-4'>Create an account</h1>
    <div className='container'>
     <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control"onChange={onChange} name="name" id="name" aria-describedby="nameHelp"/> 
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control"onChange={onChange} name="email" id="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password"onChange={onChange} minLength={5} id="password" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" onChange={onChange} name='cpassword' id="cpassword" minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
    </div>
  )
}

export default Signup
