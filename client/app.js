
new Vue({
  el: '#app',
  data: {
    cities: names,
    value: '',
    selection: '',
    open: false,
    current: 0
  },
  methods: {
    submit: function (e) {
      e.preventDefault()
      // var mobile = document.getElementById('mobile-field').value
      var crypto = document.getElementById('crypto-form-field').value
      var url = 'https://api.coinmarketcap.com/v1/ticker/' + crypto.toLowerCase() + '/'
      Vue.http.get(url).then((response) => {
        // success callback
        console.log(crypto + ' price: ' + response.body[0].price_usd)
      }, (response) => {
        // error callback
        console.log(response)
      })
    },
    enter () {
      this.selection = this.matches[this.current]
      this.open = false
    },
    isActive (index) {
      return index === this.current
    },
    change () {
      if (this.open === false) {
        this.open = true
        this.current = 0
      }
    },
    suggestionClick (index) {
      console.log('index in suggestionClick: ', index)
      this.selection = suggestions[index]
      this.open = false
    }
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
    },
    openSuggestion () {
      console.log('inside open Suggestion')
      return this.selection !== '' &&
        this.matches.length !== 0 &&
        this.open === true
    }
  }
});

