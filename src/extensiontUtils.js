import { store } from "./store"
import { INITIALIZE } from "./store/actionTypes"

function sendMessage(msg, cb) {
  window.chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    window.chrome.tabs.sendMessage(tabs[0].id, msg, cb)
  })
}

function getInitialStateFromInsideExtension() {
  const file = "runInPage.js"
  chrome.tabs.executeScript({ file }, () =>
    sendMessage("getInitialState", response => {
      if (response) {
        store.dispatch({ type: INITIALIZE, payload: response })
      }
    })
  )
}
const isExtension = () => window?.chrome?.tabs
export { getInitialStateFromInsideExtension, sendMessage, isExtension }
