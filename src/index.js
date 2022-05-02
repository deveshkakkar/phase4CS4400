import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  About,
  Contact,
  Blog,
  Posts,
  Post,
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
} from "./components";


ReactDOM.render(
  <Router>
    <Navigation />
    <div id = "lol"/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
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
      <Route path="/blog" element={<Blog />}>
        <Route path="" element={<Posts />} />
        <Route path=":postSlug" element={<Post />} />
      </Route>
    </Routes>
    <Footer/>
  </Router>,

  document.getElementById("root")
);

serviceWorker.unregister();
