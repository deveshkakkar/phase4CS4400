import React, { Component, useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function HireWorker() {
  const [perID, setPerID] = useState("");
  const [bankID, setBankID] = useState("");
  const [currBank, setCurrBank] = useState(" ");
  // let list = async () => Axios.get(`http://localhost:3002/api/employees`).then((response) => response.data.map(element => {return  <option>{element.perID}</option>}))
  // props.g = 12;
  useEffect(() => {
    const get = async () => {
      const result = await Axios.get(`http://localhost:3002/api/banks`)
        .then((response) => response.data)
        .then((data) =>
          data.map((element) => {
            return <option>{element.bankID}</option>;
          })
        );
      setBankID(result);
    };
    get();
  }, []);
  useEffect(() => {
    const get = async () => {
      const arg = "bankID != '" + currBank + "'";
      const result = await Axios.get(`http://localhost:3002/api/workfor`, {
        params: { args: arg },
      })
        .then((response) => response.data)
        .then((data) =>
          data.map((element) => {
            return <option>{element.perID}</option>;
          })
        );
      setPerID(result);
    };
    get();
  }, [currBank]);

  let navigate = useNavigate();
  let selectedValue;
  return (
    <div>
      <label>
        Bank:
        <select
          class="m-3"
          id="banks"
          onChange={(e) => {
            setCurrBank(e.target.value);
          }}
        >
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
        <input class="m-1" id="salary" type="text" name="corpId" />
      </label>
      <button
        type="button"
        class="m-3"
        onClick={() => {
          let perID = document.getElementById("employees").value;
          let bankID = document.getElementById("banks").value;
          let salary = document.getElementById("salary").value;
          Axios.post(`http://localhost:3002/api/hire_worker`, {
            perID: perID,
            bankID: bankID,
            salary: salary,
          }).then((response) => {
              alert(JSON.stringify(response.data))
          });
        }}
      >
        Hire Worker
      </button>
      <button class="m-3" onClick={() => navigate("/adminNavigation")}>
        Back
      </button>
    </div>
  );
}

export default HireWorker;
