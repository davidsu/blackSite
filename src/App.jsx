import React from "react"
import { Provider } from "react-redux"
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"
import { store } from "./store"
import {
  WalkmeUrl,
  LoadWalkmeBtn,
  SnippetSelector,
  SnippetTextArea
} from "./components"
import { isExtension } from "./core"
import "./App.css"

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
})

const App = () => (
  <div className="App">
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        {!isExtension() && <h1>Davidsu Black Site</h1>}
        <div>
          <SnippetTextArea />
        </div>
        <div>
          <LoadWalkmeBtn />
        </div>
        <WalkmeUrl />
        <SnippetSelector />
      </ThemeProvider>
    </Provider>
  </div>
)

export default App
