var twilioSID = 'AC6a96f661f8eadeec1c258a05631dac41';
var twilioAuthToken = '687ea65a90a85dddcbc53fe26210d208';
var twilio = require('twilio')(twilioSID, twilioAuthToken);

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

module.exports = {sendSMS: sendSMS}
