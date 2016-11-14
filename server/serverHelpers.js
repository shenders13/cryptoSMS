var twilioSID = 'AC6a96f661f8eadeec1c258a05631dac41';
var twilioAuthToken = '687ea65a90a85dddcbc53fe26210d208';
var twilio = require('twilio')(twilioSID, twilioAuthToken);
var models = require('./models/index.js');

//------------------------------------------------------- 
//------------------------ SMS --------------------------
//------------------------------------------------------- 

var sendSMS = function(mobile, crypto, res) {
  twilio.messages.create({
      body: "Howdy, I'm Sam. I'll send you the price of " + crypto + " each day.",
      to: mobile,
      from: '+16503514141'
    }, function(err, data) {
      if (err) {
        console.error(err);
      } else {
        console.log('SMS successfully sent!');
      }
  });
  var reply = 'Sent first SMS to ' + mobile + '. They subscribed to: ' + crypto
  res.send(reply);
}

//------------------------------------------------------- 
//-------------------- GET ACCOUNTS ---------------------
//------------------------------------------------------- 


var getAccounts = function(res) {
  models.Account.findAll({}).then(function(accounts) {
    res.json(accounts);
  })
}


//------------------------------------------------------- 
//------------ SAVE NEW USER & SMS THEM -----------------
//------------------------------------------------------- 


var sendSMSAndSaveAccount = function(mobile, crypto, res) {
  sendSMS(mobile, crypto, res)
  models.Account.create({mobile: mobile, crypto: crypto})
  .then(function() {})
}

//------------------------------------------------------- 
//------------------ BULK SMS TASK ----------------------
//------------------------------------------------------- 
  
  // get all (mobile, crypto) tuples from DB and store 'accounts' object
  // compose 'price 'object. keys being the cryptos & values being null initally
  // iterate through keys of price object
    // fetch data on each crypto from API
    // for each get request update the price object with the price
  //
  // once price object is fully generated, iterate through 'accounts' object
    // for each account, use the mobile number to find the related price in 'price'
    // sms the mobile number with the price
  //

//------------------------------------------------------- 
//--------------------- EXPORT --------------------------
//------------------------------------------------------- 

module.exports = {
  sendSMS: sendSMS, 
  getAccounts: getAccounts, 
  sendSMSAndSaveAccount: sendSMSAndSaveAccount
}
