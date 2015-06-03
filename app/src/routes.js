import Router from './lib/router.js'
import App from './app.js'

class AppRouter extends Router {
  constructor(app){
    super()
    this.App = app
    this.params = {}
  }
  route(path, component) {
    super.route(path, component, this._showComponent.bind(this, component))
  }
  _showComponent(component, params) {
    this.params = params
    this.App.show(component)
  }
}

let router = new AppRouter(App)

router.route('/', 'main-menu')
router.route('/sceance', 'sceance')

router.notFound(() => {App.showNotFound()})

export default router