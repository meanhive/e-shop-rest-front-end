import React, { useState,useContext,useEffect } from 'react'
import {  Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../util/ProductItem';

export default function Details(props) {
    const id = props.match.params.id;
    // console.log('id', id);
    const state = useContext(GlobalState);
    let [products] = state.productAPI.products;
    //  console.log('details', products);

    const [detailProduct, setDetailProduct] = useState([]);
    const addCart = state.userAPI.addCart;
    
    useEffect(() => {
        if(id) {
            products.forEach(product => {
                if(product._id === id) setDetailProduct(product)
            });
        }
    }, [id,products]);

     //console.log(detailProduct);
    if(detailProduct.length === 0) return null;

    return (
        <React.Fragment>
            <div className="container" style={{marginTop:'80px'}}>
                <div className="row">
                    <div className="col-md-6">
                            <img src={detailProduct.images.url} alt={detailProduct.title} className="img-fluid img-rounded img-thumbnail p-3"/>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="card p-2">
                            <div className="card-body">
                            <div className="card-content d-flex justify-content-between align-items-center">
                                <h2 className="card-title text-uppercase text-primary"> { detailProduct.title} </h2>
                                <h4 className="text-white badge bg-success float-end"> #{ detailProduct.product_id } </h4>
                            </div>
                            <h3 className="badge bg-danger"> &#8377; { detailProduct.price } </h3>
                             
                            <div className="accordion accordion-flush" id="details">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="content-1">
                                       <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#desc">
                                            Description
                                       </button>
                                    </h2>
                                    <div id="desc" className="accordion-collapse collapse">
                                        <p> {detailProduct.description} </p>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="content-1">
                                        <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#content">
                                                Content
                                        </button>
                                    </h2>
                                    <div id="content" className="accordion-collapse collapse">
                                        <p> {detailProduct.content} </p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mt-2"> <strong className="text-info">SOLD: </strong> 
                                     <span className="badge bg-secondary">{detailProduct.sold}</span>
                                    </h5>
                                    <button onClick={() => addCart(detailProduct._id)} className="btn btn-primary float-end">Add to Cart</button>
                                </div>
                            </div>
                        </div>
             
                    </div>
                </div>

                <div className="row mt-3 mb-3">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body" style={{ overflowX:'auto' }}>
                                <h3 className="text-left text-primary">Related Products</h3>
                                <div className="row">
                                    {
                                        products.map(product => {
                                            return product.category === detailProduct.category ?
                                                (
                                                    <div className="col-md-4">
                                                        <ProductItem key={product._id} product={product} addCart={addCart}  />
                                                    </div>
                                                ) : null
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}