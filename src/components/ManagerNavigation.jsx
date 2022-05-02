import React from "react";
import Axios from "axios";
import './managerNavigation.css';
import { NavLink } from "react-router-dom";

function ManagerNavigation() {
    return ( 
        <div class="loginbox">
            <h1>Manager Menu</h1>

             <div>
             <NavLink className="nav-link" to="/">
                <button type="button" class="button"> 
                    <span class="button__text">Pay Employee</span>
                </button>
                </NavLink>
            </div>

            <div>
            <NavLink className="nav-link" to="/">
                <button type="button" class="button"> 
                    <span class="button__text">Hire Worker</span>
                </button>
                </NavLink>
            </div>
        </div>
    );
}
export default ManagerNavigation;