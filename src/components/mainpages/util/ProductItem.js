import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'

export default function ProductItem({product}) {
    const {_id,product_id,images, title, price, description, checked} = product;
    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin;
    const addCart = state.userAPI.addCart;
    
    return (
        <div className="card mb-4 mt-2">
            
            {
                isAdmin && (
                        <input type="checkbox" checked={checked} className="float-end check form-check-input" />
                        )
            }
                {
                    isAdmin ? (
                        <img src={images.url} alt="" height="200" style={{ objectFit:'cover' }} className="card-img-top img-rounded"/>
                    ) : (
                        <Link className="text-dec-none"  to={`/detail/${_id}`}>
                            <img src={images.url} alt="" height="200" style={{ objectFit:'cover' }} className="card-img-top img-rounded"/>
                        </Link>
                    )
                }
                    <div className="card-body">
                        <div className="card-content d-flex justify-content-between align-items-center">
                            <p className="card-title text-capitalize text-primary"> { title} </p>
                            <p className="text-white badge bg-success float-end"> #{ product_id } </p>
                        </div>
                        <span className="text-danger float-end">&#8377;  {price} </span>
                        <details>
                            <summary>Description</summary>
                            <p><small className="card-text"> {description} </small></p>
                        </details>
                    </div>

            <div className="card-footer">
                {
                    isAdmin ? (
                        <>
                        <Link className="btn btn-sm btn-outline-primary" to={`/edit_product/${_id}`}> 
                        <i className="bi bi-pencil-square"></i> </Link>
                        <Link className="btn btn-sm btn-outline-danger float-end" to="#!"> 
                        <i className="bi bi-trash"></i>
                        </Link>
                        </>
                    ) :  (<Link className="btn btn-sm btn-outline-primary" to="#!" onClick={() => addCart(product)} > Add to Cart </Link>)
                }
            </div>
        </div>
       
    )
}
