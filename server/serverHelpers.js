require('dotenv').config()
const twilioSID = process.env.CRYPTO_SMS_TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.CRYPTO_SMS_TWILIO_ACCOUNT_AUTH_TOKEN;
const twilio = require('twilio')(twilioSID, twilioAuthToken);

var models = require('./models/index.js');
var request = require('request');

//------------------------------------------------------- 
//------------------------ SMS --------------------------
//------------------------------------------------------- 

var sendSMS = function(mobile, crypto, intro, change, price) {
  if (intro) {
    var text = "Howdy, I'm Sam. I'll send you the price of " + crypto + " each day."
  } else {
    var text = crypto + ' ' + change + '%. Now at $' + (Number(price).toFixed(2)).toString() + ' USD'
  }

  twilio.messages.create({
      body: text,
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
  sendSMS(mobile, crypto, true)
  models.Account.create({mobile: mobile, crypto: crypto})
  .then(function(object) {
    res.send(object)
  })
}

//------------------------------------------------------- 
//------------------ BULK SMS TASK ----------------------
//------------------------------------------------------- 
  
var smsAll = function() {

  // get all (mobile, crypto) tuples from DB
  models.Account.findAll({}).then(function(accounts) {
    var cryptoArray = [];
    var promiseArray = [];
    var output = {};
    var users = []

    accounts.forEach(function(item) {
      var crypto = item.crypto;
      var mobile = item.mobile
      var user = {crypto: crypto, mobile: mobile}
      users.push(user);
      cryptoArray.push(crypto);
    })

    // get latest data for each crypto from API
    cryptoArray.forEach(function(crypto) {
      var url = 'https://api.coinmarketcap.com/v1/ticker/' + crypto.toLowerCase() + '/';
      var promise = new Promise(function(resolve, reject) {
        request.get(url, function(err, response, body) {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(response.body));
          }
        });
      });
      promiseArray.push(promise);
    })

    // store crypto, latest value & percentage change in 'price' object
    Promise.all(promiseArray).then(function(results) {
      results.forEach(function(item) {
        var obj = item[0];
        var price = {};
        price['crypto'] = obj.name
        price['value'] = obj.price_usd
        price['change'] = obj.percent_change_24h
        output[obj.name] = price
      })

      users.forEach(function(user) {
        var crypto = user.crypto;
        var mobile = user.mobile;
        var value = output[crypto].value;
        var change = output[crypto].change;
        sendSMS(mobile, crypto, false, change, value)
      })
      // for each account, use the mobile number to find the related price in 'price'
      // sms the mobile number with the price

      console.log('output object', output)
    }).catch(function(err) {
      console.log('Catch: ', err);
    });

  })
}


//------------------------------------------------------- 
//--------------------- EXPORT --------------------------
//------------------------------------------------------- 

module.exports = {
  sendSMS: sendSMS, 
  getAccounts: getAccounts, 
  sendSMSAndSaveAccount: sendSMSAndSaveAccount,
  smsAll: smsAll
}
