import React from "react"
import { Provider } from "react-redux"
import Container from "@material-ui/core/Container"
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"
import { store } from "./store"
import { WalkmeUrl, LoadWalkmeBtn, SnippetSelector } from "./components"
import { isExtension } from "./core"
import "./App.css"

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
})

const App = () => (
  <div className="App">
    <Container maxWidth="sm">
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          {!isExtension() && <h1>Davidsu Black Site</h1>}
          <LoadWalkmeBtn />
          <WalkmeUrl />
          <br />
          <br />
          <SnippetSelector />
        </ThemeProvider>
      </Provider>
    </Container>
  </div>
)

export default App
