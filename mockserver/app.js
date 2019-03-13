var express = require('express');
var bodyParser     =        require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/login', function (req, res) {
  console.log("Login");
  console.log(req.headers);
  res.json({
    username: req.body.username,
    token: Buffer.from(req.body.username + ":" + req.body.password).toString('base64')
  });
});

app.get('/jokes401', function (req, res) {
  console.log("Jokes 401");
  console.log(req.headers);
  res.json({
    value: "bad Joke"
  })
});

app.get('/jokes', function (req, res) {
  console.log(req.headers);
  res.json({data: "data"});
});

app.get('/401', function(req, res) {
    res.sendStatus(401);
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});