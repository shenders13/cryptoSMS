var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var twilioSID = 'AC6a96f661f8eadeec1c258a05631dac41';
var twilioAuthToken = '687ea65a90a85dddcbc53fe26210d208';
var twilio = require('twilio')(twilioSID, twilioAuthToken);
var app = express();
app.use(bodyParser.json());
app.use('/', express.static('../client'));
app.set('port', (process.env.PORT || 8080));


// Node Modules
app.get('/vue', function(req, res) {
  res.sendFile(path.join(__dirname,'../node_modules/vue/dist/vue.js'));
});
app.get('/vue-resource', function(req, res) {
  res.sendFile(path.join(__dirname,'../node_modules/vue-resource/dist/vue-resource.js'));
});
app.get('/bootstrap', function(req, res) {
  res.sendFile(path.join(__dirname,'../node_modules/bootstrap/dist/css/bootstrap.min.css'));
});

// Endpoints
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client'));
});

app.get('/send_sms_save_user', function(req, res) {
  var mobile = req.query.mobile;
  var crypto = req.query.crypto;

  twilio.messages.create({
      body: "Howdy, I'm Sam. I'll send you the price of " + crypto + " each day.",
      to: mobile,
      from: '+16503514141'
    }, function(err, data) {
      if (err) {
        console.error('Error sending SMS');
        console.error(err);
      } else {
        console.log('SMS successfully sent!');
      }
  });
  var reply = 'Sent first SMS to ' + mobile + '. They subscribed to: ' + crypto
  res.send(reply)
});


app.listen(process.env.PORT || 8080, function () {
  console.log('process.env.PORT: ', process.env.PORT);
});