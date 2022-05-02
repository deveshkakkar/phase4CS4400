import React from "react";
import Axios from "axios";
import './adminNavigation.css';

function AdminNavigation() {
    return ( 
        <div class="loginbox">
            <h1>Admin Menu</h1>

             <div>
                <button type="button" class="button"> 
                    <span class="button__text">View Stats</span>
                </button>
            </div>

            <div>
                <button type="button" class="button"> 
                    <span class="button__text">Create Corporation</span>
                </button>

                <button type="button" class="button"> 
                    <span class="button__text">Create Fee</span>
                </button>
            </div>

            <div>
                <button type="button" class="button"> 
                    <span class="button__text">Manage Users</span>
                </button>

                <button type="button" class="button"> 
                    <span class="button__text">Manage Overdraft</span>
                </button>
            </div>

            <div>
                <button type="button" class="button"> 
                    <span class="button__text">Hire Worker</span>
                </button>

                <button type="button" class="button"> 
                    <span class="button__text">Pay Employees</span>
                </button>
            </div>

            <div>
                <button type="button" class="button"> 
                    <span class="button__text">Replace Manager</span>
                </button>

                <button type="button" class="button"> 
                    <span class="button__text">Manage Accounts</span>
                </button>
            </div>

            <div>
                <button type="button" class="button"> 
                    <span class="button__text">Create Bank</span>
                </button>
            </div>
        </div>
    );
}
export default AdminNavigation;