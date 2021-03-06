import React, {useState} from "react";
import Axios from "axios";
import './login.css';
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import AdminNavigation from "./AdminNavigation";
import ManagerCustomer from "./ManagerCustomer";
import { set } from "express/lib/application";
import ManagerNavigation from "./ManagerNavigation";
import CustomerNavigation from "./CustomerNavigation";

let user;
let role;
export {user};
export {role};

function Login() {
    const [userView, setUserView] = useState(false);
    const [userID,setUserID] = useState("");
    const [pw,setPw] = useState("");
    const UserLogin = () => {
        Axios.post(`http://localhost:3002/api/loginUsers`, {userID: userID, pw: pw}).then((response)=>{
            var data = response['data'];
            if (data === 'Not found') {
                alert("Incorrect UserID/password");
            }
            if (data === 'Admin') {
                setUserView("Admin");
            }
            if (data === 'Both') {
                setUserView("Both");
            }
            if (data === 'Manager') {
                setUserView("Manager");
            }
            if (data === 'Customer') {
                setUserView("Customer");
            }
            user = userID;
            role = data;

            
            
        })
        }
        
    if (!userView) {
        return (
            <div class="loginbox">
                <h1>Login</h1>     
                <div>
                    <label for="uname"><b>ID:</b></label>
                    <input type="text" placeholder="Enter Username" name="userID" onChange={(e)=> {
                        setUserID(e.target.value)
                    }} required></input>
                    <label for="psw"><b>Password:</b></label>
                    <input type="password" placeholder="Enter Password" name="pw" onChange={(e)=> {
                        setPw(e.target.value)
                    }} required></input>
                    <input type="submit" name="" onClick={UserLogin} value="Login"></input>
                    
                </div>   
            </div>
        );
    } else if (userView === "Admin") {
        return (<Navigate to="/adminNavigation" replace={false} />)
    } else if (userView === "Both") {
        return (<Navigate to="/managerCustomer" replace={false} />)
    } else if (userView === "Manager") {
        return (<Navigate to="/managerNavigation" replace={false} />)
    } else {
        return (<Navigate to="/customerNavigation" replace={false} />)
    }
}

export default Login; 
