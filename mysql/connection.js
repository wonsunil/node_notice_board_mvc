const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "1234",
    database: 'test'
}).promise();

module.exports = connection;