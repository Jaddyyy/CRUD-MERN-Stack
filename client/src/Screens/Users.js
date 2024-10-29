import React from 'react'
import { useState, useEffect } from 'react'
import toast, {Toaster} from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Users = () => {
  const [newdata, setData] = useState([])

  const fetchData = async () => {
    try{
      const response = await fetch(`http://localhost:8051/getdata`)
      const data = await response.json()
      setData(data)
    } catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
}, [])

 const DeleteHandler = async (id) =>{
  try{
    let response = await fetch(`http://localhost:8051/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const newdata = await response.json()
    if(response.ok){
      toast.success(newdata.Message)
      fetchData()
      } else{
        toast.success(newdata.Message)
      }
    } catch(error){
      console.log(error)
    }
  }

 
  return (
    <>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  {
    newdata.map((i, index) => (
      <tbody>
    <tr>
      <th scope="row"> {index+1} </th>
      <td>{i.name} </td>
      <td>{i.email} </td>
      <td> <Link to={`/edit/${i._id}`} className='btn btn-warning'>Edit</Link> </td>
      <td> <button className='btn btn-danger' type='button' onClick={() => DeleteHandler(i._id)}>Delete</button> </td>
      
    </tr>
  </tbody>
    ))
  }
</table>
<Toaster/>
    </>
  )
}

export default Users