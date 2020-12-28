const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit : 10,
  host            : '42.192.151.14',
  user            : 'liurenyou',
  password        : 'root',
  database        : 'liurenyou'
});

module.exports = pool;