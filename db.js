var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: 'clubconnect'
});

con.connect(function(err) {
    if (err) throw err;
});


module.exports = con;
