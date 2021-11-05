import axios from 'axios';
import { useState, useEffect } from 'react';
import config from '../config.json';

export default function ProductAPI() {
  /* product state */
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);

  /* get products from api */
  const getProducts = async () => {
    const res = await axios.get(`${config.api}/api/products`);
    //  console.log('products ', res.data.products);
    setProducts(res.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
  };
}
