var express = require('express');
var app = express();
var router = express.Router();
var __dirname = '/Users/allisontam/Desktop/Ami'

app.use(express.static(path.join(__dirname, 'public')));

router.get('/', function (req, res) {
    res.sendFile('index.html', {root:path.join(__dirname,'public')});
})

app.use("/", router);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
