import React, { Component, useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function StopEmployeeRole() {
  const [perID, setPerID] = useState("");
  //let list = async () => Axios.get(`http://localhost:3002/api/employees`).then((response) => response.data.map(element => {return  <option>{element.perID}</option>}))
  //props.g = 12;
  useEffect(() => {
    const get = async () => {
      const result = await Axios.get(`http://localhost:3002/api/employees`)
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
  console.log("poopp");

  let navigate = useNavigate();
  let selectedValue;
  return (
    <div>
      <select class="m-3" id="employees">
        {perID}
      </select>
      <button
        type="button"
        class="m-3"
        onClick={() => {
          selectedValue = document.getElementById("employees").value;
        }}
      >
        {" "}
        Stop Employee Role
      </button>
      <button class="m-3" onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
}

export default StopEmployeeRole;
