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



