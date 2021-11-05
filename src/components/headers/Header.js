import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../config.json'


export default function Header() {
    const state = useContext(GlobalState);
     //console.log('header', state);
    const [isLogged,setIsLogged] = state.userAPI.isLogged;
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
    // if(state.userAPI.cart === undefined) return true;
    const [cart] = state.userAPI.cart;
    const [userName] = state.userAPI.userName;

    const logoutUser = async () => {
        await axios.get(`${config.api}/user/logout`);
        localStorage.clear();
        setIsAdmin(false);
        setIsLogged(false);
        toast.success('Logout Success');
        window.location.href = '/';
    }


    const adminRouter = () => {
        return (
            <>
                <li className="nav-item">
                    <Link className="nav-link" to="/create_product">Create Product</Link></li>
                <li className="nav-item">
                    <Link className="nav-link" to="/category">Categories</Link></li>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <>
                <li className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        Account
                    </Link>
                    <ul className="dropdown-menu">
                        <li><Link to="/profile" className="dropdown-item">Profile</Link></li>
                        <li><Link to="/history" className="dropdown-item">History</Link></li>
                        <li className="dropdown-divider"></li>
                        <li><Link to="/" className="dropdown-item" onClick={logoutUser}>Logout</Link></li>
                    </ul>
                </li>
            </>
        )
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top mb-4">
          <div className="container">
                <Link to="/" className="navbar-brand">
                    { isAdmin ? 'E-Commerce-Admin': 'E-Commerce' } 
                </Link>
                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="menu">
                  <div className="d-flex justify-content-end align-items-center" style={{width:'100%'}}>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link"> Hello, {userName} </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                { isAdmin ? 'Products': 'Shop' }
                            </Link></li>
                       {
                           isAdmin && adminRouter()
                       }
                       {
                           isLogged ? loggedRouter() :  (<li className="nav-item">
                           <Link className="nav-link" to="/login">Login/Register</Link></li>)
                       }
                    </ul>
                    
                </div>
                </div>
                <ul className="navbar-nav cart-icon">
                {
                    isAdmin ? '' : (
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                <span className="badge bg-primary cart-badge">
                                   {cart.length}
                                </span>
                                <i className="fas fa-shopping-cart"></i>
                            </Link>
                        </li>
                    )
                }
            </ul>
          </div>
        </nav>
    )
}  
