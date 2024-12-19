import React from "react";
import { Link } from "react-router-dom";


const Landing = () => {
    return (
        <div className="p-5 mb-5 bg-body-tertiary rounded-3">
            <h1>
                Welcome to TODO Application
            </h1>
            <p>Sign In and start building your todo list</p>
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-primary ms-3">Register</Link>
        </div>
    )
}

export default Landing;