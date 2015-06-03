import Vue from 'vue'
require('./components/indexComponent.js')
require('./components/404Component.js')
require('./components/sceance.js')

let App = new Vue({
  data: {
  	stateParams: {},
  	state: 'main-menu'
  },
  template: '<div id="app" v-component="{{state}}"></div>',
  methods: {
    show: function(component){
      this.state = component
    }
  }
})

export default App