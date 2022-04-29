import React, { Component, useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function HireWorker() {
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
      <label>
        Bank:
        <select class="m-3" id="banks">
          {perID}
        </select>
      </label>
      <label>
        Employees:
        <select class="m-3" id="employees">
          {perID}
        </select>
      </label>
      <button
        type="button"
        class="m-3"
        onClick={() => {
          selectedValue = document.getElementById("employees").value;
        }}
      >
        Hire Worker
      </button>
      <button class="m-3" onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
}

export default HireWorker;
