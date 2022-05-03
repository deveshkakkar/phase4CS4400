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

      <Route path="/about" element={<About />} />
      <Route path="/stopEmployeeRole" element={<StopEmployee />} />      
      <Route path="/createEmployeeRole" element={<CreateEmployee />} />    
      <Route path="/createCustomerRole" element={<CreateCustomer />} />
      <Route path="/HireWorker" element={<HireWorker />} />
      <Route path="/ReplaceManager" element={<ReplaceManager />} />
      <Route path="/stopCustomerRole" element={<StopCustomer />} />
      <Route path="/AddRemoveAccount" element={<AddRemoveAccount />} />
      <Route path="/CreateAccount" element={<CreateAccount />} />

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
