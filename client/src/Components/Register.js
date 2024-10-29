import React from 'react'
import toast, {Toaster} from 'react-hot-toast'
import { useState } from 'react'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const theHandler = async(e) =>{
    e.preventDefault()
    let response = await fetch (`http://localhost:8051/register`,{
      method: "POST",
      body: JSON.stringify({name, email, password}),
      headers:{
        'Content-Type' : 'application/json'
      }
    })
    const data = await response.json()
    if (response.ok){
      toast.success(data.Message)
    } else{
      toast.error(data.Message)
    }
  }

  return (
    <>
    <div className='container mt-5'>
    <form onSubmit={theHandler}>
  <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Name</label>
    <input type="text" placeholder='Enter your Name here' className="form-control" id="exampleInputName" onChange={(e) => setName(e.target.value)} value={name} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" placeholder='Enter your Email here' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} value={email} required />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" placeholder='Enter your Password here' className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} value={password} required />
  </div>
  
  <button  type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
<Toaster/>
    </>
  )
}

export default Register