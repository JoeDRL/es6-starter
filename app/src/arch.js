import createElement from 'virtual-dom/create-element'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'

let App = {
    View: null,
    Reducer: null,
    Store: {
        state: {},
        dispatch: (action) => {
            //TODO: Update the state and then the UI
            console.groupCollapsed("%c" + action.type, "font-weight: bold; color: green;")
            console.log("Action: ", action)

            //Generate the new state
            let newState = App.Reducer(App.Store.state, action)

            //Add it to the App's store
            App.Store.state = newState

            console.log("State: ", App.Store.state)
            console.groupEnd()

            //Update the UI
            update()
        }
    },
    vTree: null,
    Node: null
}

export default function init(MainModule, cssSelector){
    let {view, update, init} = MainModule
    App.View = view
    App.Reducer = update
    App.Store.state = init() // Initial state

    App.vTree = view({state: App.Store.state, dispatch: App.Store.dispatch})
    App.Node = createElement(App.vTree)
    document.getElementById(cssSelector).appendChild(App.Node)

    return App
}

function updateSync(){
    let newTree = App.View({state: App.Store.state, dispatch: App.Store.dispatch})
    let patches = diff(App.vTree, newTree)
    App.Node = patch(App.Node, patches)
    App.vTree = newTree
}

function update(){
    setTimeout(updateSync)
}