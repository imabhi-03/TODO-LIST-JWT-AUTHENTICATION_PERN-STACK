import React, { Fragment, useState, useEffect } from "react";
import {toast} from "react-toastify";
import InputTodo from "./todolist/InputTodo";
import ListTodo from "./todolist/ListTodo";

const Dashboard = ({ setAuth }) => {

    const [name, setName] = useState("");
    const [allTodos, setAllTodos] = useState([]);
    const [todosChange, setTodosChange] = useState(false);

    async function getProfile() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/",
                {
                    method: "GET",
                    headers: { jwtToken: localStorage.token } 

                }
            );

            const parseRes = await response.json(); 
            setAllTodos(parseRes);
            setName(parseRes[0].user_name);
        } catch (err) {
            console.error(err.message);
        }
    }

    const logout = e => {
        e.preventDefault();
        localStorage.removeItem("token")
        setAuth(false);
        toast.success("Logged out successfully");
    }

   
    useEffect(() => {
        getProfile();
        setTodosChange(false);
    },[todosChange]);

    return (
            <Fragment>
                <div className="d-flex justify-content-around mt-5">
                <h2> {name} 's Todo List</h2>
                <button className="btn btn-warning" onClick={e => logout(e)}>Logout</button>
                </div>
                <InputTodo setTodosChange={setTodosChange} />
                <ListTodo allTodos={allTodos} setTodosChange={setTodosChange} />
            </Fragment>
    );
};

export default Dashboard;