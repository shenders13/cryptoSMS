var App = Vue.component('App', {
  template: '<span>My name is Sam. This is the App Component</span>',
  data: {
    message: 'This is the App component!'
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