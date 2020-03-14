import { store } from "./store"
import { SET_SNIPPET } from "./store/actionTypes"
import { sources } from "./consts"

const walkmeCustomeLibUrl = "walkmeCustomeLibUrl"
let reloadWalkmeCountDown = 6
const isExtension = () => window?.chrome?.tabs
const sendMessage = msg =>
  window.chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    window.chrome.tabs.sendMessage(tabs[0].id, msg)
  })

function setLocalStorage(key, value) {
  if (isExtension()) {
    sendMessage({ setLocalStorage: [key, value] })
  } else {
    localStorage.setItem(key, value)
  }
}

function removeLocalStorage(key) {
  if (isExtension()) {
    sendMessage({ removeLocalStorage: key })
  } else {
    localStorage.removeItem(key)
  }
}

function loadWalkMe(snippetArg) {
  const snippet =
    typeof snippetArg === "string" ? snippetArg : store.getState().snippet
  if (isExtension()) {
    sendMessage({ loadWalkMe: snippet })
  } else {
    console.log({ snippet })
    if (!--reloadWalkmeCountDown) location.reload() // eslint-disable-line no-restricted-globals
        window._walkMe?.removeWalkMe?.() //eslint-disable-line
    try {
      // eslint-disable-next-line no-eval
      window.eval(snippet)
      // eslint-disable-next-line no-empty
    } catch {}
  }
}

const shouldReloadWalkme = (newState, oldState) =>
  !isExtension() &&
  (newState.snippet !== oldState.snippet ||
    newState.walkmeUrl !== oldState.walkmeUrl)

function getRealWalkmeUrl(libVersion) {
  if (/^\d{8}-\d{6}/.test(libVersion)) {
    return `https://cdn.walkme.com/player/lib/walkme_lib_${libVersion}.js`
  }
  return sources[libVersion]
}

let state = {}
store.subscribe(() => {
  const newState = store.getState() || {}
  if (newState.walkmeUrl !== state.walkmeUrl) {
    const realUrl = getRealWalkmeUrl(newState.walkmeUrl)
    if (!realUrl || realUrl === "production") {
      removeLocalStorage(walkmeCustomeLibUrl)
    } else {
      setLocalStorage(walkmeCustomeLibUrl, realUrl)
    }
  }
  if (newState.snippet !== state.snippet) {
    setLocalStorage("snippet", newState.snippet)
  }
  if (shouldReloadWalkme(newState, state)) {
    loadWalkMe(newState.snippet)
  }
  state = newState
})

const setSnippet = payload => store.dispatch({ type: SET_SNIPPET, payload })
export { setSnippet, loadWalkMe, isExtension }
