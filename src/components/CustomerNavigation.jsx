import React from "react";
import Axios from "axios";
import './customerNavigation.css';

function CustomerNavigation() {
    return ( 
        <div class="loginbox">
            <h1>Customer Menu</h1>

             <div>
                <button type="button" class="button"> 
                    <span class="button__text">Manage Accounts</span>
                </button>
            </div>

            <div>
                <button type="button" class="button"> 
                    <span class="button__text">Deposit / Withdrawl</span>
                </button>
            </div>

            <div>
                <button type="button" class="button"> 
                    <span class="button__text">Manage Overdraft</span>
                </button>
            </div>

            <div>
                <button type="button" class="button"> 
                    <span class="button__text">Make Transfer</span>
                </button>
            </div>
        </div>
    );
}
export default CustomerNavigation;