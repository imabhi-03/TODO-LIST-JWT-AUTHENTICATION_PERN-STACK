import React, { Fragment, useState } from "react";


const InputTodo = ({setTodosChange}) => {

    const [description, setDescription] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { description }; 

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("jwtToken", localStorage.token);

            const response = await fetch("http://localhost:5000/dashboard/todos", 
                {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(body) 
                }
            );

            // const parseResponse = await response.json();
            // console.log(parseResponse);
            setTodosChange(true);
            setDescription("");

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center my-5"> Input Todo </h1>
            <form className="d-flex" onSubmit={onSubmitForm}>
                <input type="text" placeholder="Add Todo" className="form-control"
                    value={description} onChange={e => setDescription(e.target.value)}>
                </input>
                <button className="btn btn-success">
                    Add
                </button>
            </form>
        </Fragment>
    )
}

export default InputTodo;