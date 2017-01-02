var express = require('express');
var app = express();
var router = express.Router();

app.use(express.static(__dirname));
router.get('/', function (req, res) {
    res.sendFile('index.html', {root:__dirname});
})

router.get('/apply', function (req, res) {
    res.sendFile('typeform.html', {root:__dirname});
})

router.get('/createAccount', function (req, res) {
    res.sendFile('account.html', {root:__dirname});
})

app.use("/", router);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
