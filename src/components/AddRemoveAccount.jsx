import React, { Component, useEffect, useState } from "react";
import Axios from "axios";
import {user, role} from "./Login.jsx"
import { useNavigate } from "react-router-dom";

function AddRemoveAccount() {
  const [personID, setPerID] = useState("");
  const [data, setData] = useState("");
  const [curr, setCurr] = useState("");
  let userName = user;
  //let list = async () => Axios.get(`http://localhost:3002/api/employees`).then((response) => response.data.map(element => {return  <option>{element.perID}</option>}))
  //props.g = 12;
/*   useEffect(() => {
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
  }, []); */
  const [per, setPer] = useState("");
  useEffect(() => {
    const get = async () => {
      const result = await Axios.get(`http://localhost:3002/api/customers`)
        .then((response) => response.data)
        .then((data) =>
          data.map((element) => {
            return <option>{element.perID}</option>;
          })
        );
      setPer(result);
    };
    get();
  }, []);
  useEffect(() => {
    const get = async () => {
      if(role === 'Admin') {
        const result = await Axios.get(`http://localhost:3002/api/getAccounts`)
        .then((response) =>  response.data)
        .then((data) =>
          data.map((element) => {
            return <option value={[element.bankID, element.accountID]}>{element.accountID}</option>;
          })
        );
        setData(result);
      } else {
        const arg = '"' + user +'"';
        const result = await Axios.get(`http://localhost:3002/api/accountsowned`, {
        params: { args: arg },
      })
        .then((response) =>  response.data)
        .then((data) =>
          data.map((element) => {
            return <option value={[element.bankID, element.accountID]}>{element.accountID}</option>;
          })
        );
        setData(result);
      }
      
    };
    get();
  }, [user, role]);

  const hi = async (bruh) => {
    bruh = bruh.split(",");
    const arg = '"' + bruh[0] +'" AND accountID = "'+ bruh[1] +'")';
    const result = await Axios.get(`http://localhost:3002/api/numAccesses`, {
      params: { args: arg },
    })
      .then((response) =>  response.data)
      .then((data) =>
        data.map((element) => {
          return <option value={element.perID}>{element.perID}</option>;
        })
      );
    setPerID(result);
  };

  const bruh = async (brob, bro, bro2) => {
    console.log(brob);
    let arg = '"'+ brob +'", "'+bro+'", "'+ bro2[0] +'", "'+ bro2[1] +'")';
    const result = await Axios.get(`http://localhost:3002/api/removeAccess`, {
      params: { args: arg },
    })
    .then((response) => {
      alert(JSON.stringify(response.data))
  })
  };
  const bro = async (brob, bro, bro2) => {
    let arg = '"'+ brob +'", "'+bro+'", "null", "'+ bro2[0] +'", "'+ bro2[1] +'" ,0,0,"2022-05-04",0,0,0,"2022-05-04")';
    const result = await Axios.get(`http://localhost:3002/api/addAccess`, {
      params: { args: arg },
    })
    .then((response) => {
      alert(JSON.stringify(response.data))
  })
  };


  let navigate = useNavigate();
  let selectedPerson;
  let selectedAcc;
  return (
    <div>
      <label>Existing Accounts: Remove Owners</label>
      <br></br>
      <label>
        Accessible Accounts
        <select class="m-3" id="employees" onChange={(e) => {
            console.log(e.target.value);
            hi(e.target.value);
        }}>
          {data}
        </select>
      </label>
      <label>
        Customer:
        <select class="m-3" id="banks">
          {personID}
        </select>
      </label>
      <button
        type="button"
        class="m-3"
        onClick={() => {
          selectedAcc = (document.getElementById("employees").value).split(",");
          selectedPerson = document.getElementById("banks").value;
          bruh(user, selectedPerson, selectedAcc);
          alert("worked!");
        }}
      >
        Confirm
      </button>
      
      <button class="m-3" onClick={() => navigate("/")}>
        Back
      </button>
      <br></br>
      <label>Existing Accounts: Add Owners</label>
      <br></br>
      <label>
        Accessible Accounts
        <select class="m-3" id="curr" onChange={(e) => {
            console.log(e.target.value);
        }}>
          {data}
        </select>
      </label>
      <label>
        Customer:
        <select class="m-3" id="person">
          {per}
        </select>
      </label>
      <button
        type="button"
        class="m-3"
        onClick={() => {
          selectedAcc = (document.getElementById("curr").value).split(",");
          selectedPerson = document.getElementById("person").value;
          bro(user, selectedPerson, selectedAcc);
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
