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
      res.send(err)
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});
app.get("/api/bank", (req, res) => {
    db.query("select bankID from bank", (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    });
  });
  app.get("/api/corporation", (req, res) => {
    db.query("select corpID from corporation", (err, result) => {
      if (err) {
        console.log(err);
      }
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

    app.get("/api/getAccounts", (req,res)=>{
      db.query("select bankID, accountID from bank_account", (err,result)=>{
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


  app.get("/api/removeAccess", (req, res) => {
    const query = "call remove_account_access(" + req.query.args;
    console.log(query)
    db.query(query, (err, result) => {
      if (err) {
        res.send(err)
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    });
  });

  app.get("/api/addAccess", (req, res) => {
    const query = "call add_account_access(" + req.query.args;
    console.log(query)
    db.query(query, (err, result) => {
      if (err) {
        res.send(err)
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    });
  });

  app.get("/api/accountsowned", (req, res) => {
    const query = "select bankID, accountID from access where perID=" + req.query.args;
    console.log(query)
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.send(result);
    });
  });

  app.get("/api/numAccesses", (req, res) => {
    const query = "select DISTINCT perID from access where (bankID, accountID) in (select bankID, accountID from access where bankID =" + req.query.args;
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
        res.send(err)
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

app.post("/api/stop_employee_role", (req, res) => {
  const perID = req.body.perID;
  db.query("call stop_employee_role(?)", [perID], (err, result) => {
    if (err) {
      res.send(err)
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/api/stop_customer_role", (req, res) => {
    const perID = req.body.perID;
    db.query("call stop_customer_role(?)", [perID], (err, result) => {
      if (err) {
        res.send(err)
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    });
  });

  app.post("/api/start_employee_role", (req, res) => {
    const perID = req.body.perID;
    const SSN = req.body.SSN;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const bday = req.body.bday;
    const state = req.body.state;
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
          res.send(err)
          console.log(err);
        } else {
          console.log(result);
          res.send(result);
        }
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
    const city  = req.body.city;
    const state  = req.body.state;
    const zip = req.body.zip;
    const dtjoin = req.body.dtjoin;
    const password = req.body.password;
    
    db.query(
      "call start_customer_role(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [perID, SSN, fname, lname, bday, street, city, state, zip, dtjoin, password],
      (err, result) => {
        if (err) {
          res.send(err)
          console.log(err);
        } else {
          console.log(result);
          res.send(result);
        }
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
          res.send(err)
          console.log(err);
        } else {
          console.log(result);
          res.send(result);
        }
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
          res.send(err)
          console.log(err);
        } else {
          console.log(result);
          res.send(result);
        }
      });
  });

  app.post('/api/createFee', (req, res) => {
      const bank = req.body.bank;
      const account = req.body.account;
      const feeType = req.body.feeType;
      db.query("call create_fee(?, ?, ?)",[bank, account, feeType], (err,result)=>{
        if (err) {
          res.send(err)
          console.log(err);
        } else {
          console.log(result);
          res.send(result);
        }
      });   });

      app.get("/api/account", (req,res)=>{
          db.query("select accountID from bank_account", (err,result)=>{
              if (err) {
                  console.log(err)
              } 
              res.send(result)
          });   
      });

      app.get('/api/savingAccounts', (req, res) => {
          db.query("select accountID from savings", (err,result)=>{
              if(err) {
              console.log(err)
              } 
              res.send(result)
          });   });

          app.get('/api/checkingAccounts', (req, res) => {
              db.query("select accountID from checking", (err,result)=>{
                  if(err) {
                  console.log(err)
                  } 
                  res.send(result)
              });   });

    app.post('/api/startOverdraft', (req, res) => {
        const bank = req.body.bank;
        const account = req.body.account;
        const bank2 = req.body.bank2;
        const account2 = req.body.account2;
        const requester = req.body.user;
        console.log([requester, bank, account, bank2, account2]);
        db.query("call start_overdraft(?, ?, ?, ?, ?)",[requester, bank, account, bank2, account2], (err,result)=>{
          if (err) {
            res.send(err)
            console.log(err);
          } else {
            console.log(result);
            res.send(result);
          }
        });   });

    app.post('/api/stopOverdraft', (req, res) => {
        const bank = req.body.inputBank;
      const account = req.body.inputAccount;
      const requester = req.body.user;
      console.log([requester, bank, account]);
        db.query("call stop_overdraft(?, ?, ?)",[requester, bank, account], (err,result)=>{
          if (err) {
            res.send(err)
            console.log(err);
          } else {
            console.log(result);
            res.send(result);
          }
        });   });

      app.post('/api/MakeAccountTransfer', (req, res) => {
          const bank = req.body.bank;
          const account = req.body.account;
          const bank2 = req.body.bank2;
          const account2 = req.body.account2;
          const amount = req.body.amount;
          const today = new Date();
          const day = String(today.getDate()).padStart(2, '0');
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const year = today.getFullYear();
          const date = year + '-' + month + '-' + day;
          const requester = req.body.user;
          console.log([requester, amount, bank, account, bank2, account2, date]);
          db.query("call account_transfer(?, ?, ?, ?, ?, ?, ?)",[requester, amount, bank, account, bank2, account2, date], (err,result)=>{
            if (err) {
              res.send(err)
              console.log(err);
            } else {
              console.log(result);
              res.send(result);
            }
          });   });

    app.post('/api/MakeDeposit', (req, res) => {
        const bank = req.body.bank;
        const account = req.body.account;
        const amount = req.body.amount;
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const date = year + '-' + month + '-' + day;
        const requester = req.body.user;
        console.log([requester, amount, bank, account, date]);
        db.query("call account_deposit(?, ?, ?, ?, ?)",[requester, amount, bank, account, date], (err,result)=>{
          if (err) {
            res.send(err)
            console.log(err);
          } else {
            console.log(result);
            res.send(result);
          }
        });   });

    app.post('/api/MakeWithdrawal', (req, res) => {
        const bank = req.body.bank;
        const account = req.body.account;
        const amount = req.body.amount;
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const date = year + '-' + month + '-' + day;
        const requester = req.body.user;
        db.query("call account_withdrawal(?, ?, ?, ?, ?)",[requester, amount, bank, account, date], (err,result)=>{
          if (err) {
            res.send(err)
            console.log(err);
          } else {
            console.log(result);
            res.send(result);
          }
        });   });

  app.post('/api/createBank', (req,res)=> {

      const bankID = req.body.bankID;
      const name = req.body.name;
      const street = req.body.street;
      const city = req.body.city;
      const state = req.body.state;
      const zip = req.body.zip;
      const resAssets = req.body.resAssets;
      const corpID = req.body.corpID;
      const manager = req.body.manager;
      const bank_employee = req.body.employee;
      console.log("cat");
      console.log(corpID);
      db.query("call create_bank(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[bankID, name, street, city, state, zip, resAssets, corpID, manager, bank_employee], (err,result)=>{
        if (err) {
          res.send(err)
          console.log(err);
        } else {
          console.log(result);
          res.send(result);
        }
      });   });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
