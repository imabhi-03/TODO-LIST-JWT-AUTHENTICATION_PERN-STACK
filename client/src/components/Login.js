import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";

const Login = ({ setAuth }) => {

    const [inputs, setInputs] = useState(
        {
            email: "",
            password: ""
        });

    const { email, password } = inputs;

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });


    };
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { email, password };
            const response = await fetch("http://localhost:5000/authentication/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );

            const parseRes = await response.json();
            
            if(parseRes.jwt_token)
            {
            localStorage.setItem("token" ,parseRes.jwt_token);
            setAuth(true);
            toast.success("Logged in successfully!");
            }
            else{
                setAuth(false);
                toast.error(parseRes);
            }

        } catch (err) {
            console.error(err.message);

        }
    }




    return (
        <Fragment>
            <h1 className="text-center my-5">
                Login
            </h1>
            <form onSubmit={onSubmitForm}>
                <input type="email" name="email" placeholder="Enter your email" className="form-control my-3" value={email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Enter your password" className="form-control my-3" value={password} onChange={handleChange} />
                <button className="btn btn-success w-100">Submit</button>
            </form>
            <Link to="/register">Register</Link>
        </Fragment>
    )
}

export default Login;