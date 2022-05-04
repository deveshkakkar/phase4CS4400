import React, { Component, useEffect, useState } from "react";
import Axios from "axios";
//import { useNavigate } from "react-router-dom";
//let navigate = useNavigate();


function CreateFee() {
  const [feeType, setFeeType] = useState("");
  const [bankID,setbankID] = useState("");

  useEffect(() => {
    const get = async () => {
      const result = await Axios.get(`http://localhost:3002/api/bank`)
        .then((response) => response.data)
        .then((data) =>
          data.map((element) => {
            return <option>{element.bankID}</option>;
          })
        );
      setbankID(result);
    };
    get();
  }, []);

  const [accountID,setAccountID] = useState("");
  
    useEffect(() => {
      const get = async () => {
        const result = await Axios.get(`http://localhost:3002/api/account`)
          .then((response) => response.data)
          .then((data) =>
            data.map((element) => {
              return <option>{element.accountID}</option>;
            })
          );
        setAccountID(result);
      };
      get();
    }, []);

  return (
    <div class="p-3">
      <form>
      <label>
        Banks:
        <select class="m-3" id="banks">
          {bankID}
        </select>
      </label>
      <label>
        Accounts:
        <select class="m-3" id="accounts">
          {accountID}
        </select>
      </label>
      <label class="p-2">
        Fee Type:
        <input class="m-1" type="text" name="feeType"  onChange={(e)=> {
                    setFeeType(e.target.value)
                }}/>
      </label>
      <br></br>
      <button
        type="button"
        class="m-3"
        onClick={() => {
          const inputBank = document.getElementById("banks").value;
          const inputAccount = document.getElementById("accounts").value;
          Axios.post('http://localhost:3002/api/createFee', {bank: inputBank, account: inputAccount, feeType: feeType}).then((response) => {
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
      <button class="m-3">
        Back
      </button>
      </form>
    </div>
  );
}

export default CreateFee;
