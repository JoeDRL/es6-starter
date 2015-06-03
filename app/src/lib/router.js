import pathToReg from 'path-to-regexp'

//Router
export default class Router {
  constructor() {
    this.currentState = undefined
    this.routes = []
    this.defaultCb = () => {
      throw new Error("Router: route not found but no notFound handler defined (call router.notFound(callback))")
    }
  }

  route(path, name, callback) {
      let keys = []

      //Define the route and turn it into a regexp
      let route = {
        regexp: pathToReg(path, keys),
        callback: callback,
        name: name
      }

      //Extract all parameters in the route object
      route.keys = keys.map((key) => {
        return key.name
      })

      //Add the route to the router
      this.routes.push(route)
  }

  notFound(callback) {
    this.defaultCb = callback
  }

  navigate(path) {
    location.hash = '#' + path
  }

  match(path) {
    let matched = false

    this.routes.some((route) => {
      //Try to match the path
      let matchResult = path.match(route.regexp)

      //If it matched
      if (matchResult !== null) {
        matched = true

        //Update current state
        this.currentState = route.name

        //Construct the params object
        let params = {}
        matchResult.slice(1, 2 + route.keys.length).forEach((key, i) => {
          params[route.keys[i]] = key
        })

        //Call the correct handler
        route.callback(params)

        //Stop the route iteration
        return true
      }
    })

    if (matched === false) {
      //Update currentState
      this.currentState = 'not-found'
      this.defaultCb()
    }
  }

  _extractPath() {
    let hash = location.hash
    let path = hash.slice(1, hash.length)

    return path
  }

  start() {
    //Call the initial handler
    this.match(this._extractPath())

    //Wire up the onhashchange event
    window.onhashchange = () => {
      this.match(this._extractPath())
    }
  }
}
