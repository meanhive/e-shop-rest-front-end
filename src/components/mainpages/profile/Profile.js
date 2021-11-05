import axios from 'axios';
import React, { useState,useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { GlobalState } from '../../../GlobalState';
import config from '../../../config.json'


export default function Profile(props) {
    const state = useContext(GlobalState);
    const [userData, setUserData] = useState('');
    const [token] = state.token;

    useEffect(() => {
        
        const getUser = async () => {
            try {
                /* get user auth token from api */
                const res = await axios.get(`${config.api}/user/infor`, {
                    headers: { Authorization: token }
                });

                console.log('profile' ,res);
                setUserData(res.data);

            } catch (error) {
                toast.error(error.response.data.msg);
            }
        }
        getUser();

        
    }, [])

    return (
        <div className="container" style={{ marginTop:'80px' }}>
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3">Manage Profile</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card bg-secondary">
                        <div className="card-body">
                            <h4 className="display-4 text-warning text-uppercase text-center"> 
                            {userData.name}
                            </h4>
                            <h4 className="text-white text-center">
                                { userData.email }
                            </h4>
                            <h4 className="text-white text-center">
                                { userData.role === 0 ? 'User': 'Admin User' }
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
