import React, { Component, useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateCustomerRole() {
  // const [perID, setPerID] = useState("");
  // useEffect(() => {
  //   const get = async () => {
  //     const result = await Axios.get(`http://localhost:3002/api/customers`)
  //       .then((response) => response.data)
  //       .then((data) =>
  //         data.map((element) => {
  //           return <option>{element.perID}</option>;
  //         })
  //       );
  //     setPerID(result);
  //   };
  //   get();
  // }, []);
  let navigate = useNavigate();
  let selectedValue;
  return (
    <div class="p-3">
    {/* <form> */}
    <label class="p-2">
      Person ID:
      <input class="m-1" id="perID" type="text" name="corpId" />
    </label>
    <label class="p-2">
      Password:
      <input class="m-1" id="password" type="text" name="corpId" />
    </label>
    <label class="p-2">
      SSN:
      <input class="m-1" id="SSN" type="text" name="corpId" />
    </label>
    <label class="p-2">
      first name:
      <input class="m-1" id="firstName" type="text" name="corpId" />
    </label>
    <label class="p-2">
      last name:
      <input class="m-1" id="lastName" type="text" name="corpId" />
    </label>
    <label class="p-2">
      Birth Date:
      <input class="m-1" id="bday" type="date" name="corpId" />
    </label>
    <label class="p-2">
      Street Address:
      <input class="m-1" id="street" type="text" name="corpId" />
    </label>
    <label class="p-2">
      City:
      <input class="m-1" id="city" type="text" name="corpId" />
    </label>
    <label class="p-2">
      State:
      <input class="m-1" id="state" type="text" name="corpId" />
    </label>
    <label class="p-2">
      Zip:
      <input class="m-1" id="zip" type="text" name="corpId" />
    </label>
    <label class="p-2">
      Date Joined:
      <input class="m-1" id="datejoined" type="date" name="corpId" />
    </label>
    <input
      class="m-1"
      type="submit"
      value="Create"
      onClick={() => {
        const perID = document.getElementById("perID").value
        const password = document.getElementById("password").value
        const SSN = document.getElementById("SSN").value
        const fname = document.getElementById("firstName").value
        const lname = document.getElementById("lastName").value
        const bday = document.getElementById("bday").value
        const street = document.getElementById("street").value
        const city = document.getElementById("city").value
        const state = document.getElementById("state").value
        const zip = document.getElementById("zip").value
        const dtjoin = document.getElementById("datejoined").value
        Axios.post('http://localhost:3002/api/start_customer_role',  {perID: perID, SSN: SSN, fname: fname, lname: lname, bday:bday, street: street, city: city, state: state, zip: zip, dtjoin: dtjoin, password: password}).then((response) => {
          alert(JSON.stringify(response.data))
      })
    }}
    />
    <input
      class="m-1"
      type="submit"
      value="Cancel"
      onClick={() => navigate("/")}
    />
    {/* </form> */}
  </div>
  );
}

export default CreateCustomerRole;
