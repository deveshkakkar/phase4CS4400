import React from "react";
import Axios from "axios";


function PayEmployee() {

  const LikePost = () => {
    Axios.get(`http://localhost:3002/api/get`).then((response) => {
      alert(JSON.stringify(response.data))
  })
    }
  return (
    <button class="m-3" onClick={LikePost}>
      Pay All Employee</button>
  );
}

export default PayEmployee;
