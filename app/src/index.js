import h from 'virtual-dom/h'
import date from 'datejs'
import init from './arch'
import Freezer from 'freezer-js'

let Application = {
    init: () => {
        return new Freezer({
            count: 0
        })
    },

    update(state, action){
        return state.set('count', state.count + 1)
    },

    view: ({state, dispatch}) => {
        return h('h1', 'Count: ' + state.count.toString())
    }
}

let App = init(Application, 'app')
window.Store = App.Store
