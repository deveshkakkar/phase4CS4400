import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Phase 4
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Pay All Employee
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  Create a Corporation
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/CreateBank">
                  Create a Bank
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/CreateFee">
                  Create a Fee
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/StartStopOverdraft">
                  Manage Overdraft
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/MakeDepositAndWithdrawal">
                  Make Deposit and Withdrawal
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/MakeAccountTransfer">
                  Make Account Transfer
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/stopEmployeeRole">
                  Stop Employee Role
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/stopCustomerRole">
                  Stop Customer Role
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/displayCorpStat">
                  Display Corp Stat
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/displaybankstat">
                  Display Bank Stat
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/displayaccstat">
                  Display Account Stat
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/displayempstat">
                  Display Employee Stat
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/displaycuststat">
                  Display Customer Stat
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/createEmployeeRole">
                  Create Employee Role
                </NavLink>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/createCustomerRole">
                    Create Customer Role
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/HireWorker">
                    Hire Worker
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/ReplaceManager">
                    Replace Manager
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/AddRemoveAccount">
                    Add or Remove Account Access
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/CreateAccount">
                    Create Account
                  </NavLink>
                </li>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
