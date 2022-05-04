import React from "react";
import Axios from "axios";
import './adminNavigation.css';
import { NavLink } from "react-router-dom";

function AdminNavigation() {
    return ( 
        <div class="loginbox" style = {{height: "650px"}}>
            <h1>Admin Menu</h1>

            <div>
             <NavLink className="nav-link"  to="/viewStats">
                <button type="button" class="button"> 
                    <span class="button__text">View Stats</span>
                </button>
                </NavLink>
            </div>

            <div>
            <NavLink className="nav-link" to="/createCorp" style = {{float: "left"}}>    
                <button type="button" class="button"> 
                    <span class="button__text">Create Corporation</span>
                </button>
                </NavLink>
            </div>

            <div>
            <NavLink className="nav-link"  to="/CreateFee">
                <button type="button" class="button"> 
                    <span class="button__text">Create Fee</span>
                </button>
                </NavLink>
            </div>

            <div>
            <NavLink className="nav-link" to="/manageUsers" style = {{float: "left"}}>
                <button type="button" class="button"> 
                    <span class="button__text">Manage Users</span>
                </button>
                </NavLink>
            </div>

            <div>
            <NavLink className="nav-link" to="/StartStopOverdraft">
                <button type="button" class="button"> 
                    <span class="button__text">Manage Overdraft</span>
                </button>
                </NavLink>
            </div>

            <div>
            <NavLink className="nav-link" to="/HireWorker" style = {{float: "left"}}> 
                <button type="button" class="button"> 
                    <span class="button__text">Hire Worker</span>
                </button>
                </NavLink>
            </div>

            <div>
            <NavLink className="nav-link" to="/payEmployee">
                <button type="button" class="button"> 
                    <span class="button__text">Pay Employees</span>
                </button>
                </NavLink>
            </div>

            <div>
            <NavLink className="nav-link" to="/ReplaceManager" style = {{float: "left"}}>
                <button type="button" class="button"> 
                    <span class="button__text">Replace Manager</span>
                </button>
                </NavLink>
            </div>

            <div>
            <NavLink className="nav-link" to="/AddRemoveAccount">
                <button type="button" class="button"> 
                    <span class="button__text">Manage Accounts</span>
                </button>
                </NavLink>
            </div>

            <div>
            <NavLink className="nav-link" to="/CreateBank">
                <button type="button" class="button"> 
                    <span class="button__text">Create Bank</span>
                </button>
                </NavLink>
            </div>
        </div>
    );
}
export default AdminNavigation;