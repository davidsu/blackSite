import throttle from "lodash/throttle"
import { store } from "./store"
import { getInitialState } from "./store/initialState"
import { superScriptLoaderCode } from "./consts"
import { SET_SNIPPET, INITIALIZE } from "./store/actionTypes"
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

const loadWalkMe = throttle(snippetArg => {
  if (!isExtension() && !--reloadWalkmeCountDown) {
    location.reload() // eslint-disable-line no-restricted-globals
  }
  window._walkMe?.removeWalkMe?.() // eslint-disable-line no-unused-expressions, no-underscore-dangle
  const snippet =
    typeof snippetArg === "string"
      ? snippetArg
      : store.getState().snippet || store.getState().snippetFiles.snippetOnPage
  evalCode("loadWalkMe", snippet)
}, 600)

function loadSuperscript() {
  evalCode("evalCode", superScriptLoaderCode)
}

function shouldReloadWalkme(newState, oldState) {
  if (isExtension()) return false
  return (
    newState.snippet !== oldState.snippet ||
    newState.walkmeUrl !== oldState.walkmeUrl ||
    newState.customUserSettings !== oldState.customUserSettings ||
    newState.qaFeature !== oldState.qaFeature ||
    newState.isUsingLocalPrelib !== oldState.isUsingLocalPrelib ||
    newState.isReduxStackTraceOn !== oldState.isReduxStackTraceOn
  )
}

function loadInitialState() {
  if (window?.chrome?.tabs) {
    window.chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      window.chrome.tabs.sendMessage(
        tabs[0].id,
        "getInitialState",
        response => {
          if (response) {
            store.dispatch({ type: INITIALIZE, payload: response })
          }
        }
      )
    })
  }
}
async function loadExternalConfig(config) {
  await syncStateToLocalStorage(config)
  if (isExtension()) {
    setTimeout(loadInitialState, 10)
  } else {
    store.dispatch({ type: INITIALIZE, payload: getInitialState() })
  }
}

let state = store.getState()
store.subscribe(async () => {
  const newState = store.getState() || {}
  await syncStateToLocalStorage(newState)
  if (shouldReloadWalkme(newState, state)) {
    loadWalkMe(newState.snippet)
  }
  state = newState
})

const setSnippet = payload => store.dispatch({ type: SET_SNIPPET, payload })
export {
  loadExternalConfig,
  setSnippet,
  loadWalkMe,
  isExtension,
  loadSuperscript
}
