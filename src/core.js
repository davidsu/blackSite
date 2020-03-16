import { store } from "./store"
import { superScriptLoaderCode } from "./consts"
import { SET_SNIPPET } from "./store/actionTypes"
import { syncStateToLocalStorage } from "./persistence"
import { sendMessage, isExtension } from "./extensiontUtils"

let reloadWalkmeCountDown = 6

function evalCode(funcName, code) {
  if (isExtension()) {
    sendMessage({ [funcName]: code })
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
  window._walkMe?.removeWalkMe?.() // eslint-disable-line no-unused-expressions, no-underscore-dangle
  const snippet =
    typeof snippetArg === "string" ? snippetArg : store.getState().snippet
  evalCode("loadWalkMe", snippet)
}

function loadSuperscript() {
  evalCode("evalCode", superScriptLoaderCode)
}

function shouldReloadWalkme(newState, oldState) {
  if (isExtension()) return false
  return (
    newState.snippet !== oldState.snippet ||
    newState.walkmeUrl !== oldState.walkmeUrl ||
    newState.customUserSettings !== oldState.customUserSettings ||
    newState.qaFeature !== oldState.qaFeature
  )
}

let state = store.getState()
store.subscribe(() => {
  const newState = store.getState() || {}
  syncStateToLocalStorage(newState)
  if (shouldReloadWalkme(newState, state)) {
    loadWalkMe(newState.snippet)
  }
  state = newState
})

const setSnippet = payload => store.dispatch({ type: SET_SNIPPET, payload })
export { setSnippet, loadWalkMe, isExtension, loadSuperscript }
