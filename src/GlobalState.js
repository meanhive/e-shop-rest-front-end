import React, { createContext, useState, useEffect } from 'react';
import ProductAPI from './API/ProductAPI';
import UserAPI from './API/UserAPI';
import CategoryAPI from './API/CategoryAPI';
import axios from 'axios';
import config from './config.json'

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {

    const [token, setToken] = useState(false);


    useEffect(()=> {
        if(localStorage.getItem('firstLogin')) {
            const refreshToken = async () => {
                const res = await axios.get(`${config.api}/user/refresh_token`);
                 console.log(res);
                setToken(res.data.accessToken);
        
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000);
            }
    
            refreshToken()
        }
       
    }, []);

    ProductAPI();
    const state = {
        token: [token, setToken],
        productAPI: ProductAPI(),
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
