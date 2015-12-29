import h from 'virtual-dom/h'
import init from './arch'

let Application = {
    init: () => {
        return {
            count: 0
        }
    },

    update(state, action){
        return {
            count: state.count + 1
        }
    },

    view: ({state, dispatch}) => {
        return h('h1', 'Count: ' + state.count.toString())
    }
}

let App = init(Application, 'app')
window.Store = App.Store
