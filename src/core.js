import {store} from './store'
import {SET_SNIPPET} from './store/actionTypes'
const walkmeCustomeLibUrl = 'walkmeCustomeLibUrl'
let reloadWalkmeCountDown = 6
function loadWalkMe(snippet) {
    console.log({snippet})
    window.localStorage.setItem('snippet', snippet)
    if(!(--reloadWalkmeCountDown)) location.reload() //eslint-disable-line no-restricted-globals
    window._walkMe?.removeWalkMe?.() //eslint-disable-line
    try {
        //eslint-disable-next-line no-eval
        eval(snippet)
    } catch {}
    return snippet
}
let state = {}
const shouldReloadWalkme = (newState, oldState) => newState.snippet !== oldState.snippet || newState.walkmeUrl !== oldState.walkmeUrl
store.subscribe(() => {
    const newState = store.getState()
    if(newState.walkmeUrl !== state.walkmeUrl) {
        if(!newState.walkmeUrl) {
            localStorage.removeItem(walkmeCustomeLibUrl)
            console.log('you are not on local lib')
        } else {
            localStorage.setItem(walkmeCustomeLibUrl, newState.walkmeUrl)
            console.log('you are on localLib ' + newState.walkmeUrl)
        }
    }
    if(shouldReloadWalkme(newState, state)) {
        loadWalkMe(newState.snippet)
    }
    state = newState
})

const setSnippet = payload => store.dispatch({type: SET_SNIPPET, payload})
export {setSnippet, loadWalkMe}
