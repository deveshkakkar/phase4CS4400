import React from "react";
import Axios from "axios";


function Home() {

  const LikePost = () => {
    Axios.get(`http://localhost:3002/api/get`).then((response)=>{
    alert("you payed everyone");
    })
    }
  return (
    <button class="m-3" onClick={LikePost}>Pay All Employee</button>
  );
}

export default Home;
