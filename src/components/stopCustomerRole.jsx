import React, { Component, useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function StopCustomerRole() {
  const [perID, setPerID] = useState("");
  useEffect(() => {
    const get = async () => {
      const result = await Axios.get(`http://localhost:3002/api/customers`)
        .then((response) => response.data)
        .then((data) =>
          data.map((element) => {
            return <option>{element.perID}</option>;
          })
        );
      setPerID(result);
    };
    get();
  }, []);
  let selectedValue;
  let navigate = useNavigate();
  console.log("");
  return (
    <div>
      <select class="m-3" id="customers">
        {perID}
      </select>
      <button
        type="button"
        class="m-3"
        onClick={() => {
          selectedValue = document.getElementById("customers").value;
        }}
      >
        Stop Customer Role
      </button>
      <button class="m-3" onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
}

export default StopCustomerRole;
