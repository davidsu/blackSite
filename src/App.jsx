import React from "react"
import { Provider } from "react-redux"
import { store } from "./store"
import {
  WalkmeUrl,
  LoadWalkmeBtn,
  SnippetSelector,
  SnippetTextArea
} from "./components"
import { isExtension } from "./core"
import "./App.css"

const App = () => (
  <div className="App">
    <Provider store={store}>
      {!isExtension() && <h1>Davidsu Black Site</h1>}
      <div>
        <SnippetTextArea />
      </div>
      <div>
        <LoadWalkmeBtn />
      </div>
      <WalkmeUrl />
      <SnippetSelector />
    </Provider>
  </div>
)

export default App
