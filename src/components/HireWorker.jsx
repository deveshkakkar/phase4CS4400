import React, { Component, useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function HireWorker() {
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
      setPerID(result);
      setBankID(result2)
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
      Salary:
      <input class="m-1" id="bday" type="text" name="corpId" />
    </label>
      <button
        type="button"
        class="m-3"
        onClick={() => {
          const perID = document.getElementById("employees").value;
          const bankID = document.getElementById("employees").value;
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
