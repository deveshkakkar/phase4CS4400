import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  PayEmployee,
  CreateCorp,
  Contact,
  Login,
  AdminNavigation,
  CustomerNavigation,
  ManagerNavigation,
  ManageUsers,
  ViewStats,
  ManagerCustomer,
  StopEmployee,
  StopCustomer,
  CreateEmployee,
  CreateCustomer,
  HireWorker,
  ReplaceManager,
  AddRemoveAccount,
  CreateAccount,
  DisplayCorpStat,
  DisplayBankStat,
  DisplayAccStat,
  DisplayEmpStat,
  DisplayCustStat,
  CreateBank,
  CreateFee,
  StartStopOverdraft,
  MakeDepositAndWithdrawal,
  MakeAccountTransfer
} from "./components";


ReactDOM.render(
  <Router>
    {/* <Navigation /> */}
    <div id = "lol"/>
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<Login/>} />

      <Route path="/adminNavigation" element={<AdminNavigation/>} />
      <Route path="/customerNavigation" element={<CustomerNavigation/>} />
      <Route path="/managerNavigation" element={<ManagerNavigation/>} />
      <Route path="/manageUsers" element={<ManageUsers/>} />
      <Route path="/viewStats" element={<ViewStats/>} />
      <Route path="/managerCustomer" element={<ManagerCustomer/>} />
      <Route path="/payEmployee" element={<PayEmployee/>} />
      <Route path="/createCorp" element={<CreateCorp />} />
      <Route path="/stopEmployeeRole" element={<StopEmployee />} />      
      <Route path="/createEmployeeRole" element={<CreateEmployee />} />    
      <Route path="/createCustomerRole" element={<CreateCustomer />} />
      <Route path="/displayCorpStat" element={<DisplayCorpStat />} />
      <Route path="/HireWorker" element={<HireWorker />} />
      <Route path="/ReplaceManager" element={<ReplaceManager />} />
      <Route path="/stopCustomerRole" element={<StopCustomer />} />
      <Route path="/AddRemoveAccount" element={<AddRemoveAccount />} />
      <Route path="/CreateAccount" element={<CreateAccount />} />
      <Route path="/displaybankstat" element={<DisplayBankStat />} />
      <Route path="/displayaccstat" element={<DisplayAccStat />} />
      <Route path="/displayempstat" element={<DisplayEmpStat />} />
      <Route path="/displaycuststat" element={<DisplayCustStat />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/CreateBank" element={<CreateBank />} />
      <Route path="/CreateFee" element={<CreateFee />} />
      <Route path="/StartStopOverdraft" element={<StartStopOverdraft />} />
      <Route path="/MakeDepositAndWithdrawal" element={<MakeDepositAndWithdrawal />} />
      <Route path="/MakeAccountTransfer" element={<MakeAccountTransfer />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);

serviceWorker.unregister();
