import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../../config.json'

export default function Login() {
    const [user, setUser] = useState({
        email: '', password: ''
    });  

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({...user, [name]:value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${config.api}/user/login`, {...user});
            toast.success("Login Successful");
            localStorage.setItem("firstLogin", true);
            window.location.href = "/";

        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    const resetInputs = (e) => {
        setUser({email: '', password: ''});
    }

    return (
        <div className="container" style={{marginTop: "80px"}}>
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card mt-4 mb-4">
                    <div className="card-body">
                        <form onSubmit={submitHandler} >
                         <fieldset>
                            <legend className="text-center text-primary">Login</legend>
                            <div className="form-floating mb-3">
                                <input type="email" name="email" id="email" className="form-control" placeholder="username" value={user.email} onChange={onChangeInput} required />
                                <label htmlFor="user">Username <span className="text-danger">* Email id</span></label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="password" name="password" id="password" className="form-control" placeholder="password" value={user.password} onChange={onChangeInput} autoComplete="on" required />
                                <label htmlFor="pass">Password <span className="text-danger">* (min 6-digits)</span></label>
                            </div>

                            <div className="form-group">
                                <input type="submit" value="Login" className="btn btn-outline-success" />
                                <input type="reset" onClick={resetInputs} className="btn btn-outline-danger float-end" />
                            </div>
                        </fieldset>
                        </form>
                    </div>
                    <div className="card-footer">
                       <span>New User </span> <Link to="/register">Register</Link> <span> Here</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
