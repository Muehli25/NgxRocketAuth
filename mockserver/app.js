var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/login', function (req, res) {
  console.log(req.body);
  res.json({
    username: req.username,
    token: Buffer.from(req.username + ":" + req.password).toString('base64')
  });
});

app.get('/jokes401', function (req, res) {
  res.sendStatus(401);
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