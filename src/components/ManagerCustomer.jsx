import React from "react";
import Axios from "axios";
import './managerCustomer.css';
import { NavLink } from "react-router-dom";


function ManagerCustomer() {
    return ( 
        <div class="loginbox">
            <h1>Manager(also Customer) Menu</h1>
             <div>
             <NavLink className="nav-link" to="/managerNavigation">
                <button type="button" class="button"  > 
                        <span class="button__text">Go to Manager Menu</span>
                    </button>
                </NavLink>    
            </div>
            <div>
            <NavLink className="nav-link" to="/customerNavigation">
                 <button type="button" class="button"> 
                    <span class="button__text">Go to Customer Menu</span>
                </button>
                </NavLink>               
            </div>
        </div>
    );
}
export default ManagerCustomer;