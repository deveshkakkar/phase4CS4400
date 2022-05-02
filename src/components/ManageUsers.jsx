import React from "react";
import Axios from "axios";
import './manageUsers.css';

function ManageUsers() {
    return ( 
        <div class="loginbox">
            <h1>Manage Users</h1>

             <div>
                <button type="button" class="button"> 
                    <span class="button__text">Create Employee Role</span>
                </button>
            </div>

            <div>
                <button type="button" class="button"> 
                    <span class="button__text">Create Customer Role</span>
                </button>
            </div>

            <div>
                <button type="button" class="button"> 
                    <span class="button__text">Stop Employee Role</span>
                </button>
            </div>

            <div>
                <button type="button" class="button"> 
                    <span class="button__text">Stop Customer Role</span>
                </button>
            </div>
        </div>
    );
}
export default ManageUsers;