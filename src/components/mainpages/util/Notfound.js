import React from 'react';
import { Link } from 'react-router-dom'

export default function Notfound() {
    return (
        <div className="container" style={{marginTop: "80px"}}>
            <div className="row">
                <div className="col-md-12">
                    <div className="jumbotron text-center bg-dark text-white">
                        <h3 className="display-1">Page Not Found</h3>
                        <h3 className="display-3 text-danger">404 Error</h3>
                        <Link to="/" className="btn btn-outline-secondary">Return Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
