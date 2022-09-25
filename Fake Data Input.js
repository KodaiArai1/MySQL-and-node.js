//Using faker to create multiple fake accounts to input into database

const { faker } = require('@faker-js/faker');
var mysql = require('mysql');
 
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',     // your root username
  database : 'joinus'   // the name of your db
});

var data = [];
for(var i = 0; i < 600; i++){
    data.push([
        faker.internet.email(),
		faker.name.firstName(),
		faker.name.lastName(),
        faker.date.past()
    ]);
}

var q = 'INSERT INTO users (email, first_name, last_name, created_at) VALUES ?';
connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});
 
connection.end();