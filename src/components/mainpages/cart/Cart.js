import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios'; 
import PayPalButton from '../Payment/PaypalButton';
import { toast } from 'react-toastify';
import config from '../../config'

export default function Cart() {
    const state = useContext(GlobalState);
    const [cart, setCart] = state.userAPI.cart;  
    const [total, setTotal] = useState(0);
    const [token] = state.token;
    const [tax, setTax] = useState(0);
    const [dc,setDC] = useState(0);
    const [final,setFinal] = useState(0);

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev,item) => {
                return prev + (item.price * item.quantity);
            }, 0);

            setTotal(total);
            const dc = 50;
            setDC(dc);
            setTax(Math.round(total * (12.5/100)));
        const final = total + (total * (12.5/100) + dc);
            setFinal(Math.round(final));
        }
        getTotal();
    }, [cart]);
  
    /* cart update logic */
    const updateCart = async (cart) => {
        await axios.patch(`${config.api}/user/addCart`, {cart}, {
            headers: { Authorization: token }
        });
    }

    /* product quantity increment */
    const increment = (id) => {
        cart.forEach(item => {
            if(item._id === id) {
                item.quantity += 1;
            }
        });
        setCart([...cart]);
        updateCart(cart);
    }

    /* product quantity decrement */
    const decrement = (id) => {
        cart.forEach(item => {
            if(item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1;
            }
        });
        setCart([...cart]);
        updateCart(cart);
    }

    /* remove product */
    const removeProduct = (id) => {
        if(window.confirm('Do you want to remove this product from cart?')){
            cart.forEach((item,index) => {
                if(item._id === id) {
                    cart.splice(index,1);
                }
            });
            setCart([...cart]);
            updateCart(cart);
        }
            
    }

    /* payment transaction */
    const tranSuccess  = async function (payment) {
       // console.log('payment =', payment);
        const { paymentID, address, paid } = payment;

        await axios.post(`${config.api}/api/payment`, {cart,paymentID,address,paid}, {
            headers: { Authorization: token }
        });
 
        setCart([]);
        updateCart([]);
        toast.success("You have successfully placed an order.");
    }
 
/* render ui if cart is empty */
    if(cart.length === 0) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="jumbotron text-center">
                            <h3 className="display-3">Cart is Empty</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    /* render ui if product is in cart */
    return (
        <div className="container" style={{marginTop:"80px"}}>

            <div className="row mb-2 mt-4">
                  <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            {
                                cart.map((product,key) => {
                                    return (
                                        <div key={key} className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-230 position-relative">
                                            <div className="col p-4 d-flex flex-column position-static overflow-auto">
                                             <div className="d-flex align-items-center justify-content-between mb-2">
                                                    <strong className="d-inline-block mb-2 text-primary text-uppercase">
                                                        { product.category }
                                                    </strong>
                                                    <button className="btn btn-sm text-danger" onClick={()=> removeProduct(product._id)} >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                               <div className="d-flex align-items-center justify-content-between mb-2">
                                               <h4 className="mb-0 text-uppercase"> { product.title } </h4>
                                               <div className="d-flex align-items-center">
                                                    <button className="btn btn-sm btn-danger" onClick={()=> decrement(product._id)} >
                                                        <i className="bi bi-dash"></i>
                                                    </button>
                                                        <strong className="p-2"> {product.quantity} </strong>
                                                    <button className="btn btn-sm btn-primary" onClick={()=> increment(product._id)} >
                                                        <i className="bi bi-plus"></i>
                                                    </button>
                                               </div>
                                               </div>
                                                <div className="mb-2 mt-2 text-muted d-flex align-items-center justify-content-between">
                                                    <p><strong>price:</strong> &#8377; { product.price }</p>
                                                    <p><strong>SubTotal:</strong> &#8377; { product.price * product.quantity }</p>
                                                </div>
                                            </div>
                                            <div className="col-auto d-none d-lg-block">
          
                                                <img className="cover" src={product.images.url} height="220" width="200" alt="product"  />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                  </div>

                  <div className="col-md-4 ml-2 mb-2 mt-4">
                    <div className="card .d-none .d-md-block .d-lg-none">
                        <div className="card-header">
                            <h4 className="card-title"> Cart Summary </h4>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <strong>SubTotal</strong>
                                    <span className="float-end"> &#8377; {total}</span>
                                </li>
                                <li className="list-group-item">
                                    <strong>Tax</strong>
                                    <span className="float-end"> &#8377; {tax} </span>
                                </li>
                                <li className="list-group-item">
                                    <strong>Delivery Charges</strong>
                                    <span className="float-end"> &#8377; {dc} </span>
                                </li>
                                <hr />
                                <li className="list-group-item">
                                    <strong>Total</strong>
                                    <span className="float-end"> &#8377; {final}  </span>
                                </li>
                                <li className="list-group-item">
                                   {/*  <Link to="/checkout" className="btn btn-success float-end">
                                    Proceed to Checkout 
                                    <i className="p-2 bi bi-arrow-right"></i></Link>  */}
                                </li>
                                <li className="list-group-item">
                                <PayPalButton total={final}
                                tranSuccess={tranSuccess} />
                                </li>
                                <li className="list-group-item">
                                    <Link to="/" className="stretched-link">
                                        <i className="bi bi-arrow-left"></i> Continue Shopping</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                  </div>
            </div>

        </div>
    )
}
