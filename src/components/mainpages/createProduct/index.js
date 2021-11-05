import React, { useContext, useState } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState';
import './createProduct.css';
import { toast } from 'react-toastify';


const LoadingSpinner = () => {
    return (
        <div className="spinner-border text-success" style={{ width: "3rem", height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}


const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    category: ''
}

export default function CreateProduct(props) {
    const state = useContext(GlobalState);
    const [product, setProduct] = useState(initialState);
    const [categories] = state.categoryAPI.categories;
    const [images, setImages] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const [callback,setCallback] = state.productAPI.callback;

    console.log('createProduct', categories);

    const styleUpload = {
        display: images ? 'block': 'none'
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        try {

            if(!isAdmin) return toast.warning('You are not an admin');
                const file = e.target.files[0];
                // console.log('file upload', file);

                if(!file) return toast.error("File doesn't exists");

                if(file.size > 1024 * 1024) return toast.error("File size must be less than 1MB");

                let formData = new FormData();
                formData.append('file', file);

                setLoading(true);
                const res = await axios.post('/api/upload', formData, {
                    headers: {
                        'content-type': 'multipart/form-data',
                        Authorization: token
                    }
                });

                setLoading(false);
                // console.log('upload response', res);
                setImages(res.data);
            
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    const handleDestroy = async (e) => {
        try {

            if(!isAdmin) return toast.error("You are not an Admin");
            setLoading(true);
            await axios.post('/api/destroy', { public_id: images.public_id }, {
                headers: { Authorization: token }
            });
            setImages(false);
            setLoading(false);
            
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    const handleChangeInput = (e) => {
        const { name, value }= e.target;
        setProduct({...product, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if(!isAdmin) return toast.error("You are not an Admin");
            if(!images) return toast.warning("No Image Uploaded");

            const res = await axios.post('/api/products', {...product, images}, {
                headers: { Authorization: token }
            });

            setImages(false);
            setProduct(initialState);
            toast.success(res.data);
            setCallback(!callback);
            props.history.push('/');
            
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    return (
        <div className="container" style={{marginTop:'80px'}}>
                <div className="row">
                    <div className="col-md-4 mt-5">
                       <div className="card upload">
                            <div className="card-body">
                                <input type="file" name="file" id="file_up" className="form-control" required onChange={handleUpload} />  
                               
                                {
                                    Loading ? <div id="file_img"><LoadingSpinner/></div> :
                                        <div id="file_img" style={styleUpload}>
                                            <img src={images ? images.url : ''} alt="" />
                                            <span onClick={handleDestroy} className="btn btn-sm btn-danger">
                                                    <i className="bi bi-x"></i>
                                            </span>
                                        </div>
                                }
                            </div>
                       </div>
                    </div>

                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-center">Create Product</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group mt-2">
                                        <label htmlFor="product_id">Product Id </label>         
                                        <input type="text" name="product_id" id="product_id" className="form-control" value={product._id} onChange={handleChangeInput}  required />                           
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="title">Product Title </label>         
                                        <input type="text" name="title" id="title" className="form-control" onChange={handleChangeInput}  value={product.title} required />                           
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="price">Product Price </label>         
                                        <input type="number" name="price" id="price" className="form-control" onChange={handleChangeInput}  value={product.price} required />                           
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="description">Product Description </label>         
                                    <textarea cols="30" rows="3" name="description" id="description" className="form-control" onChange={handleChangeInput}  value={product.description} required ></textarea>                           
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="content">Product Content </label>         
                                        <textarea cols="30" rows="3" name="content" id="content" className="form-control" onChange={handleChangeInput}  value={product.content} required></textarea>                           
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="categories">Categories</label>
                                        <select name="category" value={product.category} className="form-control" onChange={handleChangeInput}>
                                             <optgroup label="Category List">
                                                    {
                                                        categories.map((item,key) => {
                                                           return <option key={key} value={item._id} > { item.name } </option>
                                                        })
                                                    }
                                             </optgroup>
                                        </select>
                                    </div>

                                    <div className="form-group mt-2 mb-4">
                                        <input type="submit" value="Save" className="btn btn-success" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
