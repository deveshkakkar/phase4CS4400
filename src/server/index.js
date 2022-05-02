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

app.get("/api/employees", (req, res) => {
  db.query("select perID from employee", (err, result) => {
    if (err) {
      console.log(err);
    }
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

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
