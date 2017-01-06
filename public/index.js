var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

var router = express.Router();

app.use(express.static(__dirname));
router.get('/', function(req, res) {
    res.sendFile('index.html', {
        root: __dirname
    });
})

router.get('/apply', function(req, res) {
  console.log("apply button pressed");

    res.sendFile('typeform.html', {
        root: __dirname
    });
})

router.get('/createAccount', function(req, res) {
    res.sendFile('account.html', {
        root: __dirname
    });
})

app.use("/", router);

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})

app.post('/contact', function(req, res) {
    console.log('submit');

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "ami"
    });

    var user = {
        user: req.body.email,
        pass: req.body.pwd
    };

    con.query('INSERT INTO loginInfo SET ?', user, function(err, res) {
        if (err) throw err;

        console.log('Last insert ID:', res.insertId);
    });
});

/* ------------------- MySQL Code ------------------- */

var mysql = require("mysql");

// First you need to create a connection to the db
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
});

con.connect(function(err) {
    if (err) {
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});

con.end(function(err) {
    // The connection is terminated gracefully
    // Ensures all previously enqueued queries are still
    // before sending a COM_QUIT packet to the MySQL server.
});
