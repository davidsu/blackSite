import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { loadWalkMe } from "./core"
import { getInitialStateFromInsideExtension } from "./extensiontUtils"

ReactDOM.render(<App />, document.getElementById("root"))
if (window?.chrome?.tabs) {
  getInitialStateFromInsideExtension()
} else {
  loadWalkMe()
}
