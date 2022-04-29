import React, { Component, useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateEmployeeRole() {
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
    <div class="p-3">
      {/* <form> */}
      <select class="m-3" id="employees">
        {perID}
      </select>
      <br></br>
      <label class="p-2">
        Salary:
        <input class="m-1" id="salary" type="text" name="corpId" />
      </label>
      <br></br>
      <label class="p-2">
        Number of Payments:
        <input class="m-1" type="text" name="lname" />
      </label>
      <br></br>
      <label class="p-2">
        Accumulated Earnings:
        <input class="m-1" type="text" name="sname" />
      </label>
      <br></br>
      <input
        class="m-1"
        type="submit"
        value="Create"
        onClick={() => console.log(document.getElementById("salary").value)}
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

export default CreateEmployeeRole;
