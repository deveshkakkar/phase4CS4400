import React, { Component, useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function ReplaceManager() {
  const [perID, setPerID] = useState("");
  const [bankID, setBankID] = useState("");

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
        const result2 = await Axios.get(`http://localhost:3002/api/banks`)
        .then((response) => response.data)
        .then((data) =>
          data.map((element) => {
            return <option>{element.bankID}</option>;
          })
        );
      setBankID(result2)
      setPerID(result);
    };
    get();
  }, []);
  console.log("poopp");

  let navigate = useNavigate();
  return (
    <div>
      <label>
        Bank:
        <select class="m-3" id="banks">
          {bankID}
        </select>
      </label>
      <label>
        Employees:
        <select class="m-3" id="employees">
          {perID}
        </select>
      </label>
      <label class="p-2">
        New Salary:
        <input class="m-1" type="text" name="sname" id = "salary" />
      </label>
      <button
        type="button"
        class="m-3"
        onClick={() => {
          let perID = document.getElementById("employees").value;
          let bankID = document.getElementById("banks").value;
          let salary = document.getElementById("salary").value;
          Axios.post(`http://localhost:3002/api/replace_manager`,{perID: perID,
          bankID: bankID,
          salary: salary}).then((response) => {
            alert(JSON.stringify(response.data))
        })
        }}
      >
        Replace Manager
      </button>
      <button class="m-3" onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
}

export default ReplaceManager;
