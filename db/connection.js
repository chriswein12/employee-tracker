require('dotenv').config();

// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASS,
    database: 'employee_tracker'
});

connection.connect(function (err) {
    if (err) {
        return console.log(err.message);
    }
  });

module.exports = connection;