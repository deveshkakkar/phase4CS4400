import React, { Component, useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {user } from "./Login.jsx"

function CreateAccount() {
  const [perID, setPerID] = useState("");
  const [per, setPer] = useState("");
  //let list = async () => Axios.get(`http://localhost:3002/api/employees`).then((response) => response.data.map(element => {return  <option>{element.perID}</option>}))
  //props.g = 12;
  useEffect(() => {
    const get = async () => {
      const result = await Axios.get(`http://localhost:3002/api/bank`)
        .then((response) => response.data)
        .then((data) =>
          data.map((element) => {
            return <option>{element.bankID}</option>;
          })
        );
      setPerID(result);
    };
    get();
  }, []);
  useEffect(() => {
    const get = async () => {
      const result = await Axios.get(`http://localhost:3002/api/customers`)
        .then((response) => response.data)
        .then((data) =>
          data.map((element) => {
            return <option value={element.perID}>{element.perID}</option>;
          })
        );
      setPer(result);
    };
    get();
  }, []);

  const bro = async (brob, bro, bro2, bro3, bro4, bro5, bro6, bro7, bro8) => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const date = year + '-' + month + '-' + day;
    let arg = '"'+ brob +'", "'+bro+'", "'+bro2+'", "'+ bro3 +'", "'+ bro4 +'" ,"'+ bro5 +'","'+ bro6 +'","'+date+'","'+bro7+'",0,"'+bro8+'","'+date+'")';
    const result = await Axios.get(`http://localhost:3002/api/addAccess`, {
      params: { args: arg },
    })
    .then((response) => {
      alert(JSON.stringify(response.data))
  })
  };

  let navigate = useNavigate();
  let selectedValue;
  return (
    <div>
      <label>
        Customer:
        <select class="m-3" id="person">
          {per}
        </select>
      </label>
      <label>
        Account Type:
        <select class="m-3" id="AccType">
          <option value={"checking"}>Checking</option>
          <option value={"market"}>Market</option>
          <option value={"savings"}>Savings</option>
        </select>
      </label>
      <label>
        Bank:
        <select class="m-3" id="banks">
          {perID}
        </select>
      </label>
      <label class="p-2">
        Account ID:
        <input class="m-1 border border-dark" type="text" id="accID" />
      </label>
      
      <label class="p-2">
        $Initial Balance:
        <input class="m-1 border border-dark" type="number" id="IntB" />
      </label>
      <label class="p-2">
        Interest Rate:
        <input class="m-1 border border-dark" type="number" id='IntRate' />
      </label>
      <label class="p-2">
        $Min Balance:
        <input class="m-1 border border-dark" type="number" id="MinB" />
      </label>
      <label class="p-2">
        Max Withdrawals:
        <input class="m-1 border border-dark" type="number" id='MaxW' />
      </label>
      <button
        type="button"
        class="m-3"
        onClick={() => {
          bro(user, document.getElementById("person").value, document.getElementById("AccType").value, document.getElementById("banks").value, document.getElementById("accID").value, document.getElementById("IntB").value, document.getElementById("IntRate").value, document.getElementById("MinB").value, document.getElementById("MaxW").value);
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

export default CreateAccount;
