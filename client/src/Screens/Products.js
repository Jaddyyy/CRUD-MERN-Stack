import { useState, useEffect } from "react"
import React from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

const Products = () => {
  const [NewData, SetData] = useState([])
  const GetData = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      SetData(response.data);
  } catch(error){
    console.error('Failed to fetch api' ,error)
  }
};
useEffect(() => {
  GetData();
},[]);

  return (
    <>
    <div className="container mt-3">
      <div className="row">
      {
      NewData.map((i) => (
        <div className="card mb-3" style={{maxWidth: 540}}>
  <div className="row g-0">
    <div className="col-md-4">
      <img src={i.image} style={{height:150}} className="img-fluid rounded-start mt-2" alt="..." />
    </div>
    <div className="col-md-8">
      <div className="card-body">
         <h5 className="card-title">{i.title.slice(0,17)}</h5>
        <p className="card-text">{i.description.slice(0,120)}  </p>
        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
        <Link to={`/products/${i.id}`} className="btn btnview btn-primary">View More</Link>
      </div>
    </div>
  </div>
</div>
      ))
    }
      </div>
    </div>
    </>
  )
}

export default Products