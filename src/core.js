import { store } from "./store"
import { superScriptLoaderCode } from "./consts"
import { SET_SNIPPET } from "./store/actionTypes"
import { syncStateToLocalStorage } from "./persistence"
import { sendMessage, isExtension } from "./extensiontUtils"

let reloadWalkmeCountDown = 6

function evalCode(code) {
  if (isExtension()) {
    sendMessage({ eval: code })
  } else {
    try {
      // eslint-disable-next-line no-eval
      window.eval(code)
      // eslint-disable-next-line no-empty
    } catch {}
  }
}
function loadWalkMe(snippetArg) {
  if (!isExtension() && !--reloadWalkmeCountDown) {
    location.reload() // eslint-disable-line no-restricted-globals
  }
  const snippet =
    typeof snippetArg === "string" ? snippetArg : store.getState().snippet
  evalCode(snippet)
}

function loadSuperscript() {
  evalCode(superScriptLoaderCode)
}

function shouldReloadWalkme(newState, oldState) {
  if (isExtension()) return false
  return (
    newState.snippet !== oldState.snippet ||
    newState.walkmeUrl !== oldState.walkmeUrl ||
    newState.customUserSettings !== oldState.customUserSettings
  )
}

let state = store.getState()
store.subscribe(() => {
  const newState = store.getState() || {}
  syncStateToLocalStorage()
  if (shouldReloadWalkme(newState, state)) {
    loadWalkMe(newState.snippet)
  }
  state = newState
})

const setSnippet = payload => store.dispatch({ type: SET_SNIPPET, payload })
export { setSnippet, loadWalkMe, isExtension, loadSuperscript }
