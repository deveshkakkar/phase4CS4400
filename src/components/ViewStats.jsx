import React from "react";
import Axios from "axios";
import './viewStats.css';

function ViewStats() {
    return ( 
        <div class="loginbox">
            <h1>View Stats</h1>
             <div>
                <button type="button" class="button" > 
                    <span class="button__text">Display Account Stats</span>
                </button>
            </div>

            <div>
                <button type="button" class="button"> 
                    <span class="button__text">Display Corporation Stats</span>
                </button>
            </div>

            <div>
                <button type="button" class="button"> 
                    <span class="button__text">Display Bank Stats</span>
                </button>
            </div>

            <div>
                <button type="button" class="button"> 
                    <span class="button__text">Display Customer Stats</span>
                </button>
            </div>

            <div>
                <button type="button" class="button"> 
                    <span class="button__text">Display Employee Stats</span>
                </button>
            </div>
        </div>
    );
}
export default ViewStats;