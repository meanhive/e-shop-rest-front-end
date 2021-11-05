import React, { createContext, useState, useEffect } from 'react';
import ProductsAPI from './api/ProductsAPI';
import UserAPI from './api/UserAPI';
import CategoryAPI from './api/CategoryAPI';
import axios from 'axios';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {

    const [token, setToken] = useState(false);


    useEffect(()=> {
        if(localStorage.getItem('firstLogin')) {
            const refreshToken = async () => {
                const res = await axios.get('/user/refresh_token');
                 console.log(res);
                setToken(res.data.accessToken);
        
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000);
            }
    
            refreshToken()
        }
       
    }, []);

    ProductsAPI();
    const state = {
        token: [token, setToken],
        productAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoryAPI: CategoryAPI()
    }

    // console.log(state);

    return (
        <GlobalState.Provider value={state} >
            {children}
        </GlobalState.Provider>
    )
} 