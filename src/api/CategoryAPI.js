import { useState, useEffect } from 'react'
import axios from 'axios';

export default function CategoryAPI() {
    const [categories, setCategories] = useState([]);
    const [callback, setCallback] = useState(false);

    useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get('/api/category')
            // console.log('categories',res);
            setCategories(res.data);
        }

        getCategories();
    }, [callback]);

    return {
        categories: [categories, setCategories],
        callback: [callback,setCallback]
    }
}
