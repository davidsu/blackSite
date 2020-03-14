import {store} from './store'
import {SET_SNIPPET} from './store/actionTypes'
const walkmeCustomeLibUrl = 'walkmeCustomeLibUrl'
let reloadWalkmeCountDown = 6
const isExtension = () => window?.chrome?.tabs
const sendMessage = msg => 
    window.chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        window.chrome.tabs.sendMessage(tabs[0].id, msg);
    });

function setLocalStorage(key, value) {
    if(isExtension()) {
        sendMessage({setLocalStorage: [key, value]})
    } else {
        localStorage.setItem(key, value)
    }
}

function removeLocalStorage(key) {
    if(isExtension()) {
        sendMessage({removeLocalStorage: key})
    } else {
        localStorage.removeItem(key)
    }
}

function loadWalkMe(snippetArg) {
    const snippet = typeof snippetArg === 'string' ? snippetArg : store.getState().snippet
    if(isExtension()) {
        sendMessage({loadWalkMe: snippet})
    } else {
        console.log({snippet})
        if(!(--reloadWalkmeCountDown)) location.reload() //eslint-disable-line no-restricted-globals
        window._walkMe?.removeWalkMe?.() //eslint-disable-line
        try {
            //eslint-disable-next-line no-eval
            window.eval(snippet)
        } catch {}
    }
}

const shouldReloadWalkme = (newState, oldState) => !isExtension() && (newState.snippet !== oldState.snippet || newState.walkmeUrl !== oldState.walkmeUrl)
let state = {}
store.subscribe(() => {
    const newState = store.getState()
    if(newState.walkmeUrl !== state.walkmeUrl) {
        if(!newState.walkmeUrl || newState.walkmeUrl === 'production') {
            removeLocalStorage(walkmeCustomeLibUrl)
            console.log('you are not on local lib')
        } else {
            setLocalStorage(walkmeCustomeLibUrl, newState.walkmeUrl)
            console.log('you are on localLib ' + newState.walkmeUrl)
        }
    }
    if(newState.snippet !== state.snippet) {
        setLocalStorage('snippet', newState.snippet)
    }
    if(shouldReloadWalkme(newState, state)) {
        loadWalkMe(newState.snippet)
    }
    state = newState
})

const setSnippet = payload => store.dispatch({type: SET_SNIPPET, payload})
export {setSnippet, loadWalkMe, isExtension}
