const mysql = require('mysql2')
const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "200255845kh",
database:"bank_management" 
})

db.connect((err) => {
    if (err) {
      console.log("Database Connection Failed !!!", err);
    } else {
      console.log("connected to Database");
    }
});

module.exports = db;

