import React, { Component, useEffect, useState } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";



function CreateBank() {
  const [bankID,setbankID] = useState("");
  const [name,setName] = useState("");
  const [street,setStreet] = useState("");
  const [city,setCity] = useState("");
  const [state,setState] = useState("");
  const [zip,setZip] = useState("");
  const [resAssets,setResAssets] = useState(null);
  const [corpID, setcorpID] = useState("");

  useEffect(() => {
    const get = async () => {
      const result = await Axios.get(`http://localhost:3002/api/corporations`)
        .then((response) => response.data)
        .then((data) =>
          data.map((element) => {
            return <option>{element.corpID}</option>;
          })
        );
      setcorpID(result);
    };
    get();
  }, []);
  
  const [managerID, setManagerID] = useState("");

  useEffect(() => {
    const get = async () => {
      const result = await Axios.get(`http://localhost:3002/api/employees`)
        .then((response) => response.data)
        .then((data) =>
          data.map((element) => {
            return <option>{element.perID}</option>;
          })
        );
      setManagerID(result);
    };
    get();
  }, []);
  
    const [employeeID, setEmployeeID] = useState("");
  
    useEffect(() => {
      const get = async () => {
        const result = await Axios.get(`http://localhost:3002/api/employees`)
          .then((response) => response.data)
          .then((data) =>
            data.map((element) => {
              return <option>{element.perID}</option>;
            })
          );
        setEmployeeID(result);
      };
      get();
    }, []);

  return (
    <div class="p-3">
      <form>
      <label class="p-2">
        Bank ID:
        <input class="m-1" type="text" name="bankID"  onChange={(e)=> {
                    setbankID(e.target.value)
                }}/>
      </label>
      <br></br>
      <label class="p-2">
        Bank Name:
        <input class="m-1" type="text" name="name" onChange={(e)=> {
                    setName(e.target.value)
                }}/>
      </label>
      <br></br>
      <br></br>
      <label class="p-2">
        Street:
        <input class="m-1" type="text" name="street" onChange={(e)=> {
                    setStreet(e.target.value)
                }}/>
      </label>
      <br></br>
      <label class="p-2">
        City:
        <input class="m-1" type="text" name="city" onChange={(e)=> {
                    setCity(e.target.value)
                }} />
      </label>
      <br></br>
      <label class="p-2">
        State:
        <input class="m-1" type="text" name="state" onChange={(e)=> {
                    setState(e.target.value)
                }}/>
      </label>
      <label class="p-2">
        Zip:
        <input class="m-1" type="text" name="zip"  onChange={(e)=> {
                    setZip(e.target.value)
                }}/>
      </label>
      <label class="p-2">
        Reserved Assets:
        <input class="m-1" type="text" id="resAssets"  onChange={(e)=> {
                    setResAssets(e.target.valueAsNumber)
                }}/>
      </label>
      <label>
        Corporation:
        <select class="m-3" id="corporations">
          {corpID}
        </select>
      </label>
      <label>
        Managers:
        <select class="m-3" id="managers">
          {managerID}
        </select>
      </label>
      <label>
        Employee:
        <select class="m-3" id="employees">
          {employeeID}
        </select>
      </label>
      <br></br>
      <button
        type="button"
        class="m-3"
        onClick={() => {
          const inputCorpID = document.getElementById("corporations").value;
          const inputEmployeeID = document.getElementById("employees").value;
          const inputManagerID = document.getElementById("managers").value;
          let res = parseInt(document.getElementById("resAssets").value);
          Axios.post('http://localhost:3002/api/createBank', {bankID: bankID, name: name, street: street, city: city, 
            state: state, zip: zip, resAssets: res, corpID: inputCorpID, manager: inputManagerID, employee: inputEmployeeID}).then((response) => {
              if (response.data.affectedRows == 0 || response.data.affectedRows == undefined) {
                alert("it didn't work!")
              } else {
                alert("it did work!")
              }
            })
        }}
      >
        Submit
      </button>
      <NavLink className="nav-link" to="/adminNavigation" style = {{float: "left"}}>
                <button type="button" class="button"> 
                    <span class="button__text">Back</span>
                </button>
                </NavLink>
      </form>
    </div>
  );
}

export default CreateBank;
