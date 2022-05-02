const express = require('express');
const db = require('./db')
const cors = require('cors')

const app = express();
const  PORT = 3002;
app.use(cors());
app.use(express.json())


app.get("/api/get", (req,res)=>{
    db.query("call pay_employees()", (err,result)=>{
        if(err) {
        console.log(err)
        } 
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
    

app.post('/api/create', (req,res)=> {

    const corpID = req.body.corpID;
    const name = req.body.name;
    const shortName = req.body.shortName;
    const resAssets = req.body.resAssets;
    
    db.query("call create_corporation(?, ?, ?, ?)",[corpID, name, shortName, resAssets], (err,result)=>{
        if(err) {
        console.log(err)
        } 
        console.log(result)
    });   });


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)        
})



