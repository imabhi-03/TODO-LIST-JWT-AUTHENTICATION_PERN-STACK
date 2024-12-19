import React, { Fragment ,useState, useEffect} from "react";
import './App.css';

import {ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard.js"
import Login from "./components/Login.js"
import Register from "./components/Register.js";
import Landing from "./components/Landing.js";


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean =>
  {
    console.log("Setting Auth to:", boolean);
    setIsAuthenticated(boolean);
    
  };

  async function isAuth()
  {
    try {
          const response=await fetch("http://localhost:5000/authentication/is-verify",
            {
              method:"GET",
              headers: {jwtToken: localStorage.token}
            }
          );
          const parseRes=await response.json();
          parseRes ===true? setIsAuthenticated(true):setIsAuthenticated(false);

          
    } catch (err) {

        console.error(err.message);
      
    }
  }

  useEffect(() =>
  {
    isAuth()
  },[]);

  return <Fragment>
    <Router>
      <div className="container">
       
         <ToastContainer 
            position="top-right" 
            autoClose={5000} 
            hideProgressBar={false} 
            newestOnTop={false} 
            closeOnClick 
            rtl={false} 
            pauseOnFocusLoss 
            draggable 
            pauseOnHover 
          />
        <Routes>

      
          <Route path="/login" element={ !isAuthenticated? <Login setAuth={setAuth} /> : <Navigate to ="/dashboard" />}/>
          <Route path="/register" element={ !isAuthenticated? <Register setAuth={setAuth} /> :<Navigate to="/login" />}/>
          <Route path="/dashboard" element={ isAuthenticated? <Dashboard setAuth={setAuth}/> : <Navigate to="/login" />}/>
          <Route path="/" element= {!isAuthenticated ? <Landing  /> : <Navigate to ="/dashboard" />} />

        </Routes> 
      </div>

    </Router>
  </Fragment>


}

export default App;
