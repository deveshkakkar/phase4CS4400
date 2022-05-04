import React, { Component, useEffect, useState } from "react";
import Axios from "axios";
import { user, role } from "./Login.jsx";
//import { MakeDepositAndWithdrawal } from ".";
//import { useNavigate } from "react-router-dom";
//let navigate = useNavigate();

import { NavLink } from "react-router-dom";

function MakeDepositAndWithdrawal() {
  const [bankID, setbankID] = useState("");
  const [checkingAccount, setCheckingAccount] = useState("");
  const [bankID2, setbankID2] = useState("");
  const [savingAccount, setSavingAccount] = useState("");
  const [amount, setAmount] = useState(0);

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
      const result = await Axios.get(`http://localhost:3002/api/account`)
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
      const result = await Axios.get(`http://localhost:3002/api/account`)
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
          Account Bank:
          <select class="m-3" id="banks">
            {bankID}
          </select>
        </label>
        <label>
          Account ID:
          <select class="m-3" id="accounts">
            {checkingAccount}
          </select>
        </label>
        <label class="p-2">
          Dollar Amount:
          <input
            class="m-1"
            type="text"
            id="amount"
            onChange={(e) => {
              setAmount(e.target.valueAsNumber);
            }}
          />
        </label>
        <br></br>
        <button
          type="button"
          class="m-3"
          onClick={() => {
            const inputBank = document.getElementById("banks").value;
            const inputAccount = document.getElementById("accounts").value;
            const inputBank2 = document.getElementById("banks").value;
            const inputAccount2 = document.getElementById("accounts").value;
            let amount = parseInt(document.getElementById("amount").value);
            Axios.post("http://localhost:3002/api/MakeDeposit", {
              user: user,
              bank: inputBank,
              account: inputAccount,
              amount: amount,
              bank2: inputBank2,
              account2: inputAccount2,
            }).then((response) => {
              alert(JSON.stringify(response.data))
          });
          }}
        >
          Deposit
        </button>
        <NavLink className="nav-link" to="/" style={{ float: "left" }}>
          <button type="button" class="button">
            <span class="button__text">Back</span>
          </button>
        </NavLink>
      </form>
      <form>
        <label>
          Account Bank:
          <select class="m-3" id="banks">
            {bankID}
          </select>
        </label>
        <label>
          Account ID:
          <select class="m-3" id="accounts">
            {checkingAccount}
          </select>
        </label>
        <label class="p-2">
          Dollar Amount:
          <input
            class="m-1"
            type="text"
            id="amount"
            onChange={(e) => {
              setAmount(e.target.valueAsNumber);
            }}
          />
        </label>
        <br></br>
        <button
          type="button"
          class="m-3"
          onClick={() => {
            const inputBank = document.getElementById("banks").value;
            const inputAccount = document.getElementById("accounts").value;
            const inputBank2 = document.getElementById("banks").value;
            const inputAccount2 = document.getElementById("accounts").value;
            let amount = parseInt(document.getElementById("amount").value);
            Axios.post("http://localhost:3002/api/MakeWithdrawal", {
              user: user,
              bank: inputBank,
              account: inputAccount,
              amount: amount,
              bank2: inputBank2,
              account2: inputAccount2,
            }).then((response) => {
              alert(JSON.stringify(response.data));
            });
          }}
        >
          Withdrawal
        </button>
        <NavLink className="nav-link" to="/" style={{ float: "left" }}>
          <button type="button" class="button">
            <span class="button__text">Back</span>
          </button>
        </NavLink>
      </form>
    </div>
  );
}

export default MakeDepositAndWithdrawal;
