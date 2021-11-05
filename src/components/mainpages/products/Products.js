import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../util/ProductItem';

export default function Products() {

    const state = useContext(GlobalState);
    const [products] = state.productAPI.products;
    //  console.log('products = ', products);
    const [isAdmin] = state.userAPI.isAdmin;
    const addCart = state.userAPI.addCart;

    return (
        <div className="container" style={{marginTop:'80px'}}>
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body"></div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                {
                                    products.map((product, key) => {
                                        return (
                                            <div className="col-md-3" key={key}>
                                                <ProductItem  product={product} isAdmin={isAdmin} addCart={addCart} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
