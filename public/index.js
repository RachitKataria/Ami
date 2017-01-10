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

router.get('/portal', function(req, res) {
    res.sendFile('portal.html', {
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

app.post('/create', function(req,res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "ami"
    });

    var entry = {
        user: req.body.email,
        pass: req.body.pwd
    };

    // Code to insert user into database
    console.log(entry.user);
    console.log(entry.pass);

    con.query('INSERT INTO loginInfo SET ?', entry, function(err, res) {
        if (err) throw err;

        console.log('Last insert ID:', res.insertId);
    });
});

app.post('/contact', function(req, res) {
    console.log('submit');

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "ami"
    });

    var entry = {
        user: req.body.email,
        pass: req.body.pwd
    };

    //con.query("SELECT * FROM loginInfo WHERE user='test@ami.com' AND pass='test'", entry, function(err, res) {
    con.query("SELECT * FROM loginInfo WHERE user='"+entry.user+"' AND pass='" + entry.pass+"'",entry, function(err, results) {
    //con.query("SELECT * FROM loginInfo WHERE user=? AND pass=?",[entry.user,entry.pass], function(err, res) {
        if (err) {
            console.log(err);
        }

        //console.log(entry)
        //console.log(results)
        console.log(results.length)
        if (results.length == 1){
            res.redirect(301, '/portal')
        } else {
            res.redirect(301, '/');
        }
    });
});

/* ------------------- MySQL Code ------------------- */

var mysql = require("mysql");

// First you need to create a connection to the db
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
});

con.connect(function(err) {
    if (err) {
        console.log('Error connecting to Db');
        console.log(err)
        return;
    }
    console.log('Connection established');
});

con.end(function(err) {
    // The connection is terminated gracefully
    // Ensures all previously enqueued queries are still
    // before sending a COM_QUIT packet to the MySQL server.
});
