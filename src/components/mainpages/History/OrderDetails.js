import React, { useState,useContext,useEffect } from 'react'
import { useParams } from 'react-router';
import { GlobalState } from '../../../GlobalState'
import config from '../../config.json'

export default function OrderDetails(props) {
    const state = useContext(GlobalState);
    const [history] = state.userAPI.history;
    const [orderDetails, setOrderDetails] = useState([]);

    // const params = useParams();

    useEffect(() => {
        if(props.match.params.id) {
            history.forEach((item) => {
                if(item._id === props.match.params.id) setOrderDetails(item);
            })
        }
       
    }, [props.match.params.id, history]);

    console.log('order details', orderDetails);

    if(orderDetails.length === 0) return null;

    return (
        <div className="container" style={{marginTop:'80px'}}>
			<div className="row">
				<div className="col-md-12 text-center">
					<h3 className="display-3">OrderHistory</h3>
				</div>
			</div>

            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <div className="card mb-2 mt-2">
                        <div className="card-body">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <strong>Name</strong>
                                    <span className="float-end"> { orderDetails.name } </span>
                                </li>
                                <li className="list-group-item">
                                    <strong>Email</strong>
                                    <span className="float-end"> {orderDetails.email} </span>
                                </li>
                                <li className="list-group-item">
                                    <strong>Payment ID</strong>
                                    <small className="float-end"> {orderDetails.paymentID} </small>
                                </li>
                            </ul>


                            <div className="accordion mt-4" id="myOrder">
                                <div className="accordion-item">
                                    <h3 className="accordion-header" id="address">
                                        <button className="accordion-button" data-bs-toggle="collapse" data-bs-target="#add">
                                        Address</button>
                                    </h3>

                                    <div id="add" className="accordion-collapse collapse" data-bs-parent="#myOrder">
                                        <div className="accordion-body">
                                            <div className="card">
                                                <div className="card-body">
                                                    <ul className="list-group">
                                                        <li className="list-group-item">
                                                            <strong>Recipient Name</strong>
                                                            <span className="float-end"> {orderDetails.address.recipient_name} </span>
                                                        </li>
                                                        <li className="list-group-item">
                                                            <strong>Address Line 1</strong>
                                                            <span className="float-end">
                                                                {orderDetails.address.line1}
                                                            </span>
                                                        </li>
                                                        <li className="list-group-item">
                                                            <strong>City</strong>
                                                            <span className="float-end">
                                                            {orderDetails.address.city}
                                                        </span>
                                                        </li>
                                                        <li className="list-group-item">
                                                            <strong>State</strong>
                                                            <span className="float-end">
                                                            {orderDetails.address.state}
                                                        </span>
                                                        </li>
                                                        <li className="list-group-item">
                                                            <strong>Country Code</strong>
                                                            <span className="float-end">
                                                            {orderDetails.address.country_code}
                                                        </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h3 className="accordion-header" id="cart">
                                        <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#cartDetails">
                                        Cart Details</button>
                                    </h3>
                                    <div id="cartDetails" className="accordion-collapse collapse" data-bs-parent="#myOrder">
                                       <div className="accordion-body">
                                       <div className="table table-responsive">
                                       <table className="table table-secondary table-striped table-hover">
                                           <thead>
                                               <tr>
                                                   <th>Image</th>
                                                   <th>Item</th>
                                                   <th>Price</th>
                                                   <th>Quantity</th>
                                               </tr>
                                           </thead>

                                           <tbody>
                                           {
                                               orderDetails.cart.map((item,key) => {
                                                   return (
                                                       <tr>
                                                           <td>
                                                               <img src={item.images.url} alt="" className="img-fluid" height={100} width={100} />
                                                           </td>
                                                           <td>
                                                               {item.title}
                                                           </td>
                                                           <td>
                                                               &#8377;{item.price}
                                                           </td>
                                                           <td>
                                                               {item.quantity}
                                                           </td>
                                                       </tr>
                                                   )
                                               })
                                           }
                                           </tbody>
                                       </table>
                                   </div>
                                       </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
