//Reading libraries
var mysql = require("mysql");
var bodyParser = require("body-parser");
var express = require("express");
var app = express();

//Enabling communication with other files
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//Creating a local connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',     
  database : 'joinus'   
});

//Formating a "Home" page to show number of people registered (updates in real time) 
app.get("/", function(req, res){
 var q = 'SELECT COUNT(*) AS count FROM users';
 connection.query(q, function (err, results) {
 if (err) throw err;
	 var count = results[0].count;
	 res.render("home", {count: count});
 		});
});

//All data inputed from the website goes straight into the table in the database
app.post('/register', function(req,res){
 var person = {
		email: req.body.email,
		first_name: req.body.first_name,
		last_name: req.body.last_name
	};
	connection.query('INSERT INTO users SET ?', person, function(err, result) {
	console.log(err);
	console.log(result);
	 res.redirect("/");
 });
});

//#Optional pages
// app.get("/joke", function(req, res){
//  var joke = "What do you call a dog that does magic tricks? A labracadabrador.";
//  res.send(joke);
// });


// app.get("/random_num", function(req, res){
//  var num = Math.floor((Math.random() * 10) + 1);
//  res.send("Your lucky number is " + num);
// });

//Connecting to server
app.listen(3000, function () {
 console.log('Server running on 3000');
});