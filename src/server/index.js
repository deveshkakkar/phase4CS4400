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
        console.log(result)
    res.send(result)
    });   });

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

app.get("/api/employees", (req,res)=>{
    db.query("select perID from employee", (err,result)=>{
        if (err) {
            console.log(err)
        } 
        res.send(result)
    });   
});


app.get("/api/customers", (req,res)=>{
    db.query("select perID from customer", (err,result) => {
        if (err) {
            console.log(err)
        } 
        res.send(result)
    });   
});


app.post('/api/create', (req,res)=> {

    const corpID = req.body.corpId;
    const name = req.body.name;
    const shortName = req.body.shortName;
    const resAssets = req.body.resAssets;
    console.log(req.body.corpId);
    db.query("call create_corporation(?, ?, ?, ?)",[corpID, name, shortName, resAssets], (err,result)=>{
        if(err) {
        console.log(err)
        } 
        console.log(result)
    });   });


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)        
})



