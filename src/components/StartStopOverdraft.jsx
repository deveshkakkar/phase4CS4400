import React, { Component, useEffect, useState } from "react";
import Axios from "axios";
//import { useNavigate } from "react-router-dom";
//let navigate = useNavigate();

function StartStopOverdraft() {
  const [bankID, setbankID] = useState("");
  const [checkingAccount, setCheckingAccount] = useState("");
  const [bankID2, setbankID2] = useState("");
  const [savingAccount, setSavingAccount] = useState("");
  let checked = -1;

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

  useEffect(() => {
    const get = async () => {
      const result = await Axios.get(`http://localhost:3002/api/bank`)
        .then((response) => response.data)
        .then((data) =>
          data.map((element) => {
            return <option>{element.bankID}</option>;
          })
        );
      setbankID2(result);
    };
    get();
  }, []);

  useEffect(() => {
    const get = async () => {
      const result = await Axios.get(
        `http://localhost:3002/api/checkingAccounts`
      )
        .then((response) => response.data)
        .then((data) =>
          data.map((element) => {
            return <option>{element.accountID}</option>;
          })
        );
      setCheckingAccount(result);
    };
    get();
  }, []);

  useEffect(() => {
    const get = async () => {
      const result = await Axios.get(`http://localhost:3002/api/savingAccounts`)
        .then((response) => response.data)
        .then((data) =>
          data.map((element) => {
            return <option>{element.accountID}</option>;
          })
        );
      setSavingAccount(result);
    };
    get();
  }, []);

  return (
    <div class="p-3">
      <form>
        <label>
          Checking Account Bank:
          <select class="m-3" id="banks">
            {bankID}
          </select>
        </label>
        <label>
          Checking Account ID:
          <select class="m-3" id="accounts">
            {checkingAccount}
          </select>
        </label>
        <label class="p-2">
          Check for start, leave unchecked for stop
          <input
            class="m-1"
            type="checkbox"
            name="checked"
            onChange={(e) => {
              checked = checked * -1;
            }}
          />
        </label>
        <label>
          Saving Account Bank:
          <select class="m-3" id="banks2">
            {bankID2}
          </select>
        </label>
        <label>
          Saving Account ID:
          <select class="m-3" id="accounts2">
            {savingAccount}
          </select>
        </label>
        <br></br>
        <button
          type="button"
          class="m-3"
          onClick={() => {
            const inputBank = document.getElementById("banks").value;
            const inputAccount = document.getElementById("accounts").value;
            const inputBank2 = document.getElementById("banks2").value;
            const inputAccount2 = document.getElementById("accounts2").value;
            if (checked == 1) {
              Axios.post("http://localhost:3002/api/startOverdraft", {
                bank: inputBank,
                account: inputAccount,
                bank2: inputBank2,
                account2: inputAccount2,
              }).then((response) => {
                alert(JSON.stringify(response.data));
              });
            } else {
              Axios.post("http://localhost:3002/api/stopOverdraft", {
                inputBank: inputBank,
                inputAccount: inputAccount,
              }).then((response) => {
                alert(JSON.stringify(response.data));
              });
            }
          }}
        >
          Submit
        </button>
        <button class="m-3">Back</button>
      </form>
    </div>
  );
}

export default StartStopOverdraft;
