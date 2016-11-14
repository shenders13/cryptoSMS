
new Vue({
  el: '#app',
  data: {
    cities: names,
    value: '',
    cancelling: false,
    cancelled: false,
    selection: '',
    open: false,
    fetchedData: false,
    current: 0,
    mobile: '',
    crypto: '',
    price: ''
  },
  methods: {
    submit: function (e) {
      e.preventDefault()
      var crypto = document.getElementById('crypto-form-field').value
      var mobile = document.getElementById('mobile-field').value
      var url = 'https://api.coinmarketcap.com/v1/ticker/' + crypto.toLowerCase() + '/'
      this.mobile = mobile
      this.crypto = crypto
      // get crypto currency price
      Vue.http.get(url).then((response) => {
        this.price = response.body[0].price_usd;
        this.fetchedData = true;
        this.sendSmsAndSaveUser(crypto, mobile)
      })
    },
    deleteAccount: function(e) {
      e.preventDefault()
      this.cancelled = true;
      var mobile = document.getElementById('deleteAccountField').value
      var url = '/delete?mobile=' + mobile;
      Vue.http.delete(url).then((err, response) => {
        if (err) {
          console.log(err)
        } else {
          console.log('response from server after deleting: ', response);
        }
      })
    },
    // hit send_sms_save_user endpoint
    sendSmsAndSaveUser: function(crypto, mobile) {
      var url = '/send_sms_save_user?crypto=' + crypto + '&mobile=' + mobile;
      Vue.http.get(url).then((response) => {
        console.log('response after submitting', response)
      })
    },
    toggleCancel: function() {
      console.log('cancelling before: ', this.cancelling )
      this.cancelling = !this.cancelling
      console.log('cancelling after: ', this.cancelling )
    },
    home: function() {
      this.cancelling = false;
      this.cancelled = false;
    }
    // enter () {
    //   this.selection = this.matches[this.current]
    //   this.open = false
    // },
    // isActive (index) {
    //   return index === this.current
    // },
    // change () {
    //   if (this.open === false) {
    //     this.open = true
    //     this.current = 0
    //   }
    // },
    // suggestionClick (index) {
    //   console.log('index in suggestionClick: ', index)
    //   this.selection = suggestions[index]
    //   this.open = false
    // }
  },
  computed: {
    matches () {
      // debugger;
      // return this.suggestions.filter((str) => {
      //   function capitalizeFirstLetter (string) {
      //     return string.charAt(0).toUpperCase() + string.slice(1)
      //   }
      //   return str.indexOf(capitalizeFirstLetter(this.selection)) >= 0
      // })
    // },
    // openSuggestion () {
    //   console.log('inside open Suggestion')
    //   return this.selection !== '' &&
    //     this.matches.length !== 0 &&
    //     this.open === true
    }
  }
});

