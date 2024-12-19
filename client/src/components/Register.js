import React, { Fragment, useState } from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const Register = ({setAuth}) => {

    const [inputs, setInputs] = useState(
        {
            email: "",
            password: "",
            name: ""
        }
    );

    const { email, password, name } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };
    
    const onSubmitForm = async (e) =>
    {
        e.preventDefault();
        try {
                const body= {email,password,name};

                const response=await fetch("http://localhost:5000/authentication/register",
                    {
                        method:"POST",
                        headers:{"Content-Type":"application/json"},
                            body:JSON.stringify(body)
                        
                    });
                    const parseRes= await response.json();

                    if(parseRes.jwt_token)
                    {
                    localStorage.setItem("token", parseRes.jwt_token);
                    setAuth(true);
                    toast.success("Registered Successfully");
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
            <h1 className="text-center my-5">Register </h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="email"
                    name="email"  //The name attribute identifies which part of the state to update.
                    placeholder="enter your email"
                    className="form-control my-3"
                    value={email} //The value prop binds the input field to the state, ensuring the UI reflects the current state.
                    onChange={onChange}>   
                </input>
                <input
                    type="password"
                    name="password"
                    placeholder="enter your password"
                    className="form-control my-3"
                    value={password}
                    onChange={e => onChange(e)}>
                </input>
                <input
                    type="name"
                    name="name"
                    placeholder="enter your name"
                    className="form-control my-3"
                    value={name}
                    onChange={e => onChange(e)}>
                </input>

                <button className="btn btn-success w-100">Submit</button>


            </form>
            <Link to="/login">Login</Link>
        </Fragment>
    )
}

export default Register;