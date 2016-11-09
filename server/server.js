var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 8080));

app.use('/', express.static('../client'));
// app.use(express.static(path.join(__dirname, '../client')));
// app.use('',express.static());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client'));
});

app.get('/save_user', function(req, res) {
  res.send('This is the response from /save_user endpoint')
});

app.get('/vue', function(req, res) {
  res.sendFile(path.join(__dirname,'../node_modules/vue/dist/vue.js'));
});

app.get('/vue-resource', function(req, res) {
  res.sendFile(path.join(__dirname,'../node_modules/vue-resource/dist/vue-resource.js'));
});

app.get('/bootstrap', function(req, res) {
  res.sendFile(path.join(__dirname,'../node_modules/bootstrap/dist/css/bootstrap.min.css'));
});




app.listen(process.env.PORT || 8080, function () {
  console.log('process.env.PORT: ', process.env.PORT);
});