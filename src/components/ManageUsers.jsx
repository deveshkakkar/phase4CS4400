import React from "react";
import Axios from "axios";
import './manageUsers.css';
import { NavLink } from "react-router-dom";

function ManageUsers() {
    return ( 
        <div class="loginbox">
            <h1>Manage Users</h1>

             <div>
             <NavLink className="nav-link" to="/createEmployeeRole">
                <button type="button" class="button"> 
                    <span class="button__text">Create Employee Role</span>
                </button>
                </NavLink>
            </div>

            <div>
            <NavLink className="nav-link" to="/createCustomerRole">
                <button type="button" class="button"> 
                    <span class="button__text">Create Customer Role</span>
                </button>
                </NavLink>
            </div>

            <div>
            <NavLink className="nav-link" to="/stopEmployeeRole">
                <button type="button" class="button"> 
                    <span class="button__text">Stop Employee Role</span>
                </button>
                </NavLink>
            </div>

            <div>
            <NavLink className="nav-link" to="/stopCustomerRole">
                <button type="button" class="button"> 
                    <span class="button__text">Stop Customer Role</span>
                </button>
                </NavLink>
            </div>
        </div>
    );
}
export default ManageUsers;