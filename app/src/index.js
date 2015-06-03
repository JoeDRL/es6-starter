import App from './app.js'
import Router from './routes.js'
require('./ui/animations.js')

//Styles
require('../style/base.sass')

App.$mount(document.body)
Router.start()
