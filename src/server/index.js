const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

app.get("/api/get", (req, res) => {
  db.query("call pay_employees()", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send(result);
  });
});
app.get("/api/banks", (req, res) => {
    db.query("select bankID from bank", (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    });
  });


app.get("/api/getCorpStat", (req,res)=>{
    db.query("select * from display_corporation_stats", (err,result)=>{
        if(err) {
        console.log(err)
        }
        console.log(result)
    res.send(result)
    });   });



app.get("/api/getBankStat", (req,res)=>{
    db.query("select * from display_bank_stats", (err,result)=>{
        if(err) {
        console.log(err)
        }
        console.log(result)
    res.send(result)
    });   });

app.get("/api/getCustStat", (req,res)=>{
    db.query("select * from display_customer_stats", (err,result)=>{
        if(err) {
        console.log(err)
        }
        console.log(result)
    res.send(result)
    });   });



app.get("/api/getEmpStat", (req,res)=>{
    db.query("select * from display_employee_stats", (err,result)=>{
        if(err) {
        console.log(err)
        }
        console.log(result)
    res.send(result)
    });   });

app.get("/api/getAccStat", (req,res)=>{
    db.query("select * from display_account_stats", (err,result)=>{
        if(err) {
        console.log(err)
        }
        console.log(result)
    res.send(result)
    });   });


app.post("/api/loginUsers", (req,res)=>{
    console.log(req.body);
    const userID = req.body.userID;
    const pw = req.body.pw;
    var listOfUsers = []; 
    var listOfAdmins = []; 
    var isInSystem = false;
    var adminIsInSystem = false;
    var bothIsInSystem = false;
    var managerIsInSystem = false;
    var customerIsInSystem = false;
    console.log(userID);
    console.log(pw);
    db.query("SELECT perID, pwd FROM person", (err,result)=>{
        if(err) {
            console.log(err)
        } 
        listOfUsers = result;
        console.log(listOfUsers)
        for (let i = 0; i < listOfUsers.length; i++) {
            if( userID == listOfUsers[i]['perID'] && pw == listOfUsers[i]['pwd']) {
                console.log("In the system");
                isInSystem = true;
                break;
            }
        }
        if (!isInSystem) {
            console.log(" Not In the system");
            res.send("Not found");
        } else {
            //check for admin
            db.query("SELECT perID FROM system_admin",  (err,result) => {
                listOfAdmins = result;
                if(err) {
                    console.log(err)
                } 
                for (let i = 0; i < listOfAdmins.length; i++) {
                    if( userID == listOfAdmins[i]['perID']) {
                        console.log("In the admin system");
                        adminIsInSystem = true;
                        break;
                    }
                }
                if (adminIsInSystem) {
                    res.send("Admin");
                
                // check for botch
                } else {
                    db.query("SELECT perID FROM customer INNER JOIN bank ON customer.perID = bank.manager",  (err,result) => {
                        listOfBoth = result;
                        if(err) {
                            console.log(err)
                        } 
                        for (let i = 0; i < listOfBoth.length; i++) {
                            if( userID == listOfBoth[i]['perID']) {
                                console.log("In both system");
                                bothIsInSystem = true;
                                break;
                            }
                        }
                        if (bothIsInSystem) {
                            res.send("Both");
                        } else {
                            db.query("SELECT perID FROM customer",  (err,result) => {
                                listOfCustomers = result;
                                if(err) {
                                    console.log(err)
                                } 
                                for (let i = 0; i < listOfCustomers.length; i++) {
                                    if( userID == listOfCustomers[i]['perID']) {
                                        console.log("In customer system");
                                        customerIsInSystem = true;
                                        break;
                                    }
                                }
                                if (customerIsInSystem) {
                                    res.send("Customer");
                                } else {
                                    db.query("SELECT manager FROM bank",  (err,result) => {
                                        listOfManagers = result;
                                        if(err) {
                                            console.log(err)
                                        } 
                                        for (let i = 0; i < listOfManagers.length; i++) {
                                            if( userID == listOfManagers[i]['manager']) {
                                                console.log("In manager system");
                                                managerIsInSystem = true;
                                                break;
                                            }
                                        }
                                        if (managerIsInSystem) {
                                            res.send("Manager");
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
        });     
 });
    
app.get("/api/employees", (req, res) => {
  db.query("select perID from employee", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.get("/api/workfor", (req, res) => {
    const query = "select distinct employee.perID from workfor right outer join employee on workfor.perID = employee.perID where bankID is null or " + req.query.args;
    console.log(query)
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.send(result);
    });
  });

app.get("/api/customers", (req, res) => {
  db.query("select perID from customer", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.post("/api/create", (req, res) => {
  const corpID = req.body.corpId;
  const name = req.body.name;
  const shortName = req.body.shortName;
  const resAssets = req.body.resAssets;
  console.log(req.body.corpId);
  db.query(
    "call create_corporation(?, ?, ?, ?)",
    [corpID, name, shortName, resAssets],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

app.post("/api/stop_employee_role", (req, res) => {
  const perID = req.body.perID;
  db.query("call stop_employee_role(?)", [perID], (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
});

app.post("/api/stop_customer_role", (req, res) => {
    const perID = req.body.perID;
    db.query("call stop_customer_role(?)", [perID], (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    });
  });

  app.post("/api/start_employee_role", (req, res) => {
    const perID = req.body.corpId;
    const SSN = req.body.SSN;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const bday = req.body.bday;
    const street = req.body.street;
    const city  = req.body.state;
    const zip = req.body.zip;
    const dtjoin = req.body.dtjoin;
    const salary = req.body.salary;
    const payments = req.body.payments;
    const earned = req.body.earned;
    const password = req.body.password;

    console.log(req.body.corpId);
    db.query(
      "call start_employee_role(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [perID, SSN, fname, lname, bday, street, city, state, zip, dtjoin, salary, payments, earned, password],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      }
    );
  });


  app.post("/api/start_customer_role", (req, res) => {
    const perID = req.body.corpId;
    const SSN = req.body.SSN;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const bday = req.body.bday;
    const street = req.body.street;
    const city  = req.body.state;
    const zip = req.body.zip;
    const dtjoin = req.body.dtjoin;
    const password = req.body.password;
    
    db.query(
      "call start_employee_role(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [perID, SSN, fname, lname, bday, street, city, state, zip, dtjoin, password],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      }
    );
  });

  app.post("/api/hire_worker", (req, res) => {
    const perID = req.body.perID;
    const bankID = req.body.bankID;
    const salary = req.body.salary;
    db.query(
      "call hire_worker(?, ?, ?)",
      [perID, bankID, salary],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
        res.send(result);
      }
    );
  });

  app.post("/api/replace_manager", (req, res) => {
    const perID = req.body.perID;
    const bankID = req.body.bankID;
    const salary = req.body.salary;
    db.query(
      "call replace_manager(?, ?, ?)",
      [perID, bankID, salary],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
        res.send(result);
      }
    );
  });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
