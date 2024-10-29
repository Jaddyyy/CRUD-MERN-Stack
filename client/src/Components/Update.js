import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchdata = async () => {
            try {
                let response = await fetch(`http://localhost:8051/getuserbyId/${id}`)
                const data = await response.json()
                setName(data.name)
                setEmail(data.email)
            } catch (error) {
                console.log(error)
            }
        }

        fetchdata()
    }, [id])

    const Updatehandler = async (e) => {
        e.preventDefault()
        let response = await fetch(`http://localhost:8051/edituser/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, email }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        if (response.ok) {
            toast.success(data.Message)
            navigate('/users')

        } else {
            toast.error(data.Message)
        }
    }


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Edit User Details</h3>
                            <form >
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter your name"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter your email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                </div>



                                <button onClick={Updatehandler} className="btn btn-primary w-100">
                                    Update
                                </button>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Update;
