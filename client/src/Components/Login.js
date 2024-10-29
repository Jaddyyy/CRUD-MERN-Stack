import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await fetch(`http://localhost:8051/login`,{
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
    if(response.ok){
      localStorage.setItem('user', JSON.stringify(data))
      toast.success(data.Message)
      console.log(data);
    }else{
      toast.error('Invalid credentials')
    }
    }catch (error){
      toast.error('Somethng went wrong!' ,error)
    }
  }
  return (
    <>
    <div className='container mt-5'>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" />
  </div>
  <button  type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
<Toaster/>
    </>
  )
}

export default Login