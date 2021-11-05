import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import config from '../../config'

export default function Register() {
    // const [location, setLocation] = useState({});
    const [user, setUser] = useState({
        name: '', email: '', password: ''
    });  

    // useEffect(() => {
    //   const getLocation = async () => {
    //     const response = await fetch('https://geolocation-db.com/json/');
    //     const data = await response.json();
    //     // this.setState({ ip: data.IPv4 })
    //     setLocation({data});
    //     // alert(this.state.ip)
    //   }
    //   getLocation();
    // }, [])

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({...user, [name]:value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${config.api}/user/register`, {...user});
            toast.success("User register success");
            localStorage.setItem("firstLogin", true);
            window.location.href = "/";

        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    const resetInputs = (e) => {
        setUser({name: '',email: '', password: ''});
    }


    return (
        <div className="container" style={{marginTop: "80px"}}>
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card mt-4 mb-4">
                    <div className="card-body">
                        <form onSubmit={submitHandler}>
                         <fieldset>
                            <legend className="text-center text-primary">Register</legend>
                            <div className="form-floating mb-3">
                                <input type="text" name="name" id="name" className="form-control" placeholder="username" value={user.name} onChange={onChangeInput} required />
                                <label htmlFor="user">Full Name <span className="text-danger">*</span></label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="email" name="email" id="email" className="form-control" placeholder="username" value={user.email} onChange={onChangeInput} required />
                                <label htmlFor="user">Username <span className="text-danger">* Email id</span> </label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="password" name="password" id="password" className="form-control" placeholder="password" value={user.password} onChange={onChangeInput} required />
                                <label htmlFor="pass">Password <span className="text-danger">* (min 6-digits)</span> </label>
                            </div>

                            <div className="form-group">
                                <input type="submit" value="Register" className="btn btn-outline-success" />
                                <input type="button" value="Reset" onClick={resetInputs} className="btn btn-outline-danger float-end" />
                            </div>
                        </fieldset>
                        </form>
                    </div>
                    <div className="card-footer">
                        <span>Already register user </span> <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
