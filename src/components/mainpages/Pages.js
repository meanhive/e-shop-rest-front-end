import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import Details from './details/Details';
import Products from './products/Products';
import Notfound from './util/Notfound';

import { GlobalState } from '../../GlobalState';
import Checkout from './Checkout/Checkout';
import OrderHistory from './History/OrderHistory';
import OrderDetails from './History/OrderDetails';
import Profile from './profile/Profile';
import Category from './Category';
import CreateProduct from './createProduct';


export default function Pages() {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;
    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/detail/:id" exact component={Details} />
            <Route path="/login" exact component={ isLogged ? Notfound : Login} />
            <Route path="/register" exact component={isLogged ? Notfound : Register} />
            <Route path="/history" exact component={isLogged ? OrderHistory : Notfound} />
            <Route path="/history/:id" exact component={isLogged ? OrderDetails : Notfound} />
            <Route path="/profile" exact component={isLogged ? Profile : Notfound} />
            <Route path="/category" exact component={isAdmin ? Category : Notfound} />
            <Route path="/create_product" exact component={isAdmin ? CreateProduct : Notfound} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/checkout" exact component={isLogged ? Checkout: Notfound} />
            <Route component={Notfound} />
        </Switch>
    )
}
