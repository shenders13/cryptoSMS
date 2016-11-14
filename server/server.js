//------------------------------------------------------- 
//---------------------- IMPORTS ------------------------
//------------------------------------------------------- 

var express = require('express');
var path = require('path');
var models = require('./models/index.js');
var bodyParser = require('body-parser');
var serverHelpers = require('./serverHelpers.js');
var app = express();
app.use(bodyParser.json());
app.use('/', express.static('../client'));
app.set('port', (process.env.PORT || 8080));


//------------------------------------------------------- 
//----------- NODE MODULES FOR INDEX.HTML----------------
//------------------------------------------------------- 


app.get('/vue', function(req, res) {
  res.sendFile(path.join(__dirname,'../node_modules/vue/dist/vue.js'));
});
app.get('/vue-resource', function(req, res) {
  res.sendFile(path.join(__dirname,'../node_modules/vue-resource/dist/vue-resource.js'));
});
app.get('/bootstrap', function(req, res) {
  res.sendFile(path.join(__dirname,'../node_modules/bootstrap/dist/css/bootstrap.min.css'));
});

//------------------------------------------------------- 
//----------------- SERVER ENDPOINTS --------------------
//------------------------------------------------------- 

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client'));
});

app.get('/send_sms_save_user', function(req, res) {
  serverHelpers.sendSMSAndSaveAccount(req.query.mobile, req.query.crypto, res)
});

app.get('/getAccounts', function(req, res) {
  serverHelpers.getAccounts(res);
})

app.delete('/delete', function(req, res) {
  var mobile = req.query.mobile;
  models.Account.destroy({where: {mobile: mobile}}).then(function(response) {
    res.json(response);
  })
})

app.listen(process.env.PORT || 8080, function () {
  console.log('process.env.PORT: ', process.env.PORT || 8080);
});