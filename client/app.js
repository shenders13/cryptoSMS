

var navbar = Vue.component('navbar', {
  template: '<span>This is the navbar component: {{text}}</span>',
  data: function() {
    return { text: '(data from navbar component)' }
  },
});


var App = Vue.component('App', {
  template: '<div><span>{{message}}</span><navbar></navbar></div>',
  data: function() {
    return { message: '(data from App component)' }
  },
  components: {
    'navbar': navbar
  }
});


new Vue({

  // We want to target the div with an id of 'events'
  el: '#app',

  // Here we can register any values or collections that hold data
  // for the application
  data: {
    event: {
      name: 'Sam',
      description: 'Hello',
      data: 'text'
    },
    method: {
      addEvent: function() {
        console.log('add event method being run')
      }
    }
  },

  // Anything within the ready function will run when the application loads
  ready: function() {},

  // Methods we want to use in our application are registered here
  methods: {
    addEvent: function () {
      console.log('hello')
    }
  },
  components: {
    'App': App
  }
});