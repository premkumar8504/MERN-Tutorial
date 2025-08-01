const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Prem@2004',
  database: 'airbnb'
});

module.exports = pool.promise();