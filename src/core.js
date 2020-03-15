import { store } from "./store"
import { SET_SNIPPET } from "./store/actionTypes"
import { syncStateToLocalStorage } from "./persistence"
import { sendMessage, isExtension } from "./extensiontUtils"

let reloadWalkmeCountDown = 6

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
export { setSnippet, loadWalkMe, isExtension }
