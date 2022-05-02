import React from "react";
import Axios from "axios";
import './managerNavigation.css';

function ManagerNavigation() {
    return ( 
        <div class="loginbox">
            <h1>Manager Menu</h1>

             <div>
                <button type="button" class="button"> 
                    <span class="button__text">Pay Employee</span>
                </button>
            </div>

            <div>
                <button type="button" class="button"> 
                    <span class="button__text">Hire Worker</span>
                </button>
            </div>
        </div>
    );
}
export default ManagerNavigation;