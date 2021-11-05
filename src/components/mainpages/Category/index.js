import React, { useState,useContext } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import {GlobalState} from '../../../GlobalState';
import config from '../../../config.json'


export default function Category() {
    const state = useContext(GlobalState);
    const [categories, setCategories] = state.categoryAPI.categories; 
    const [category, setCategory] = useState('');
    const [token] = state.token;
    const [callback,setCallback] = state.categoryAPI.callback;
    const [onEdit, setOnEdit] = useState(false);
    const [id, setId] = useState('');

    const createCategory = async (e) => {
        e.preventDefault();
        try {

           if(onEdit) {
                const res = await axios.put(`${config.api}/api/category/${id}`, { name: category }, {
                    headers: { Authorization: token }
                });
                
            // console.log(res); 
            toast.success(res.data.msg);

           } else {

                const res = await axios.post(`${config.api}/api/category`, { name: category }, {
                    headers: { Authorization: token }
                });
                
                // console.log(res); 
                toast.success(res.data.msg);
           }
           setOnEdit(false);
           setCategory('');
           setCallback(!callback);
             
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    const editCategory = async (id,name) => {
        setId(id);
        setCategory(name);
        setOnEdit(true);
    }

    const cancelUpdate = async () => {
        setId('');
        setCategory('');
        setOnEdit(false);
        setCallback(!callback);
    }

    const deleteCategory = async (id) => {
        try {
            const status = window.confirm("Are you sure to delete category?");
                if(status) {
                    const res1 = await axios.delete(`${config.api}/api/category/${id}`, {
                        headers: { Authorization: token }
                    })
        
                    toast.success(res1.data.msg);
                } else {
                    toast.error('sorry unable to delete');
                }
                setCategory('');
                setCallback(!callback);

        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    return (
        <div className="container" style={{ marginTop:'80px' }}>
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3">Categories</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={createCategory} >
                                <fieldset>
                                    <legend className="text-center">Create/Edit Category</legend>
                                    <div className="form-group">
                                        <label htmlFor="category">Category</label>
                                       <div className="input-group">
                                            <input type="text" name="category" value={category} className="form-control" onChange={e => setCategory(e.target.value)} required />
                                            <button type="submit" className={onEdit ? "btn btn-primary": "btn btn-success"}>
                                                { onEdit ? 'Update' : 'Save' }
                                            </button>
                                            {
                                                onEdit ? <button onClick={cancelUpdate} className="btn btn-warning">Cancel</button> : ''
                                            }
                                       </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h3 className="text-center">Category List</h3>
                    <ul className="list-group">
                        {
                            categories.map((item,key) => {
                                return (
                                    <li className="list-group-item" key={key} > {item.name}
                                        <span className="btn-group float-end">
                                            <button onClick={() => editCategory(item._id, item.name)} className="btn btn-sm btn-info">
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button onClick={() => deleteCategory(item._id)}  className="btn btn-sm btn-danger">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
