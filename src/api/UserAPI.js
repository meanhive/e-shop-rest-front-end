import { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function UserAPI(token) {
    /* auth states */
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]);
    const [userName, setUserName] = useState('');
    const [callback, setCallback] = useState(false);

/* function call */
    useEffect(() => {
        if(token)  {
            const getUser = async () => {
                try {
                    /* get user auth token from api */
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token }
                    });

                    setIsLogged(true);
                    /* if admin user */
                    res.data.role === 1 ? setIsAdmin(true): setIsAdmin(false)
                    console.log( 'user api',res);
                    setUserName(res.data.name);

                    /* receive cart info from users api */
                    setCart(res.data.cart);

                } catch (error) {
                    toast.error(error.response.data.msg);
                }
            }
            getUser();
        }

    }, [token]);

    useEffect(() => {
        if(token) {
            const getHistory = async () => {
               if(isAdmin) {
                    const res = await axios.get('/api/payment', {
                        headers: { Authorization: token }
                    });
                    console.log( 'history', res.data.history);
                    setHistory(res.data);
               } else {
                    const res = await axios.get('/user/history', {
                        headers: { Authorization: token }
                    });
                    console.log( 'history', res.data.history);
                    setHistory(res.data.history);
               }
            }
            getHistory();
        }
    }, [token, callback, isAdmin])

    const addCart = async (product) => {
        if(!isLogged) return toast.warning('Please login to continue buying.');
        const check = cart.every(item => {
            return item._id !== product._id
        });

        if(check) {
            toast('Product added to cart');
            setCart([...cart, { ...product, quantity: 1 }]);

            /* store the cart into database */
            await axios.patch('/user/addCart', { cart: [...cart, {...product, quantity: 1}] }, {
                headers: { Authorization: token }
            });

        } else {
            toast.warning('This product has been added to cart.');
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart,setCart],
        addCart: addCart,
        history: [history, setHistory],
        userName: [userName,setUserName],
        callback: [callback,setCallback]
    }
}
