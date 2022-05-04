import React, { Component, useEffect, useState } from "react";
import Axios from "axios";
import {user, role} from "./Login.jsx"
import { useNavigate } from "react-router-dom";

function AddRemoveAccount() {
  const [perID, setPerID] = useState("");
  const [data, setData] = useState("");
  const [curr, setCurr] = useState("");
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
  useEffect(() => {
    const get = async () => {
      const arg = '"' + user +'"';
      const result = await Axios.get(`http://localhost:3002/api/accountsowned`, {
        params: { args: arg },
      })
        .then((response) =>  response.data)
        .then((data) =>
          data.map((element) => {
            return <option>{element.accountID}</option>;
          })
        );
      setData(result);
    };
    get();
  }, [user]);
  console.log(user);
  console.log(role);


  let navigate = useNavigate();
  let selectedValue;
  return (
    <div>
      <label>Existing Accounts: Add/Remove Owners</label>
      <br></br>
      <label>
        Accessible Accounts
        <select class="m-3" id="employees" onChange={(e) => {
            setCurrBank(e.target.value);
        }}>
          {data}
        </select>
      </label>
      <label>
        Customer:
        <select class="m-3" id="banks">
          {perID}
        </select>
      </label>
      <label class="switch">
        remove account?
        <input type="checkbox" />
        <span class="slider"></span>
      </label>
      <button
        type="button"
        class="m-3"
        onClick={() => {
          selectedValue = document.getElementById("employees").value;
        }}
      >
        Confirm
      </button>
      <button class="m-3" onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
}

export default AddRemoveAccount;
