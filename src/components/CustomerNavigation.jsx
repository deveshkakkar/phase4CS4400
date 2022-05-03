import React from "react";
import Axios from "axios";
import './customerNavigation.css';
import { NavLink } from "react-router-dom";

function CustomerNavigation() {
    return ( 
        <div class="loginbox">
            <h1>Customer Menu</h1>

             <div>
             <NavLink className="nav-link" to="/Rishi">
                <button type="button" class="button"> 
                    <span class="button__text">Manage Accounts</span>
                </button>
                </NavLink>
            </div>

            <div>
            <NavLink className="nav-link" to="/Rishi">
                <button type="button" class="button"> 
                    <span class="button__text">Deposit / Withdrawl</span>
                </button>
                </NavLink>
            </div>

            <div>
            <NavLink className="nav-link" to="/Rishi">
                <button type="button" class="button"> 
                    <span class="button__text">Manage Overdraft</span>
                </button>
                </NavLink>
            </div>

            <div>
            <NavLink className="nav-link" to="/Rishi">
                <button type="button" class="button"> 
                    <span class="button__text">Make Transfer</span>
                </button>
                </NavLink>
            </div>
        </div>
    );
}
export default CustomerNavigation;