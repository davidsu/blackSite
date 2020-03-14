import React from "react"
import WalkmeUrl from "../WalkmeUrl"
import SnippetSelector from "../SnippetSelector"
import LoadWalkmeBtn from "../LoadWalkmeBtn"
import TextArea from "../SnippetTextArea"
import { isExtension } from "../core"
import "./App.css"

const App = () => (
  <div className="App">
    {!isExtension() && <h1>Davidsu Black Site</h1>}
    <div>
      <TextArea />
    </div>
    <div>
      <LoadWalkmeBtn />
    </div>
    <WalkmeUrl />
    <SnippetSelector />
  </div>
)

export default App
