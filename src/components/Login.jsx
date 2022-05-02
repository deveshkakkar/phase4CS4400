import React from "react";
import Axios from "axios";
import './login.css';
function Login() {
    return (
        <div class="loginbox">
            <h1>Login</h1>     
            <div>
                <label for="uname"><b>ID:</b></label>
                <input type="text" placeholder="Enter Username" name="uname" required></input>
                <label for="psw"><b>Password:</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required></input>
                <input type="submit" name="" value="Login"></input>
            </div>   
        </div>
              
   
    );
}

export default Login;