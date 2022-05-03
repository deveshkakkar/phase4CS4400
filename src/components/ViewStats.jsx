import React from "react";
import Axios from "axios";
import './viewStats.css';
import { NavLink } from "react-router-dom";

function ViewStats() {
    return ( 
        <div class="loginbox">
            <h1>View Stats</h1>
             <div>
             <NavLink className="nav-link" to="/displayaccstat">
                <button type="button" class="button" > 
                    <span class="button__text">Display Account Stats</span>
                </button>
                </NavLink>
            </div>

            <div>
            <NavLink className="nav-link" to="/displayCorpStat">
                <button type="button" class="button"> 
                    <span class="button__text">Display Corporation Stats</span>
                </button>
                </NavLink>
            </div>

            <div>
            <NavLink className="nav-link" to="/displaybankstat">
                <button type="button" class="button"> 
                    <span class="button__text">Display Bank Stats</span>
                </button>
                </NavLink>
            </div>

            <div>
            <NavLink className="nav-link" to="/displaycuststat">
                <button type="button" class="button"> 
                    <span class="button__text">Display Customer Stats</span>
                </button>
                </NavLink>
            </div>

            <div>
            <NavLink className="nav-link" to="/displayempstat">
                <button type="button" class="button"> 
                    <span class="button__text">Display Employee Stats</span>
                </button>
                </NavLink>
            </div>
        </div>
    );
}
export default ViewStats;