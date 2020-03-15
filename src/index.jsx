import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { store } from "./store"
import { loadWalkMe } from "./core"
import { INITIALIZE } from "./store/actionTypes"

ReactDOM.render(<App />, document.getElementById("root"))
if (window?.chrome?.tabs) {
  window.chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    window.chrome.tabs.sendMessage(tabs[0].id, "getInitialState", response => {
      if (response) {
        store.dispatch({ type: INITIALIZE, payload: response })
      }
    })
  })
} else {
  loadWalkMe()
}
