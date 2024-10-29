import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const DetailP = () => {
  const { id } = useParams()
  const [site, setnewData] = useState('');
  const fetchdata = async() => {
   const response = await fetch(`https://fakestoreapi.com/products/${id}`)
   const site = await response.json()
   setnewData(site)
  }

  useEffect (() =>{
   fetchdata()
  })

  return (
    <>
    <div className="container mt-5 mb-5">
  <div className="row d-flex justify-content-center">
    <div className="col-md-10">
      <div className="card">
        <div className="row">
          <div className="col-md-6">
            <div className="images p-3">
              <div className="text-center p-4"> <img id="main-image" src={site.image} width={250} alt='image'/> </div>
              
            </div>
          </div>
          <div className="col-md-6">
            <div className="product p-4">
              <div className="d-flex justify-content-between align-items-center">
                
              </div>
              <div className="mt-4 mb-3"> <span className="text-uppercase text-muted brand">{site.category}
              </span>
                <h5 className="text-uppercase">{site.title}</h5>
                <div className="price d-flex flex-row align-items-center"> <span className="act-price">{site.price}</span>
                  <div className="ml-2"> <small className="dis-price">$59</small> <span>40% OFF</span> </div>
                </div>
              </div>
              <p className="about">{site.description}</p>
              <div className="sizes mt-5">
                <h6 className="text-uppercase">Size</h6> <label className="radio"> <input type="radio" name="size" defaultValue="S" defaultChecked /> <span>S</span> </label> <label className="radio"> <input type="radio" name="size" defaultValue="M" /> <span>M</span> </label> <label className="radio"> <input type="radio" name="size" defaultValue="L" /> <span>L</span> </label> <label className="radio"> <input type="radio" name="size" defaultValue="XL" /> <span>XL</span> </label> <label className="radio"> <input type="radio" name="size" defaultValue="XXL" /> <span>XXL</span> </label>
              </div>
              <div className="cart mt-4 align-items-center"> <button className="btn btn-danger text-uppercase mr-2 px-4">Add to cart</button> <i className="fa fa-heart text-muted" /> <i className="fa fa-share-alt text-muted" /> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default DetailP