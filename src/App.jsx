import React from "react"
import { Provider } from "react-redux"
import Container from "@material-ui/core/Container"
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"
import { store } from "./store"
import { WalkmeUrl, LoadWalkmeBtn, SnippetSelector, CustomUserSettings, LoadSuperscriptButton } from "./components"
import { isExtension } from "./core"
import "./App.css"

const white = "#b8b8b8"
const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    "common": {
      white
    },
    text: {
      primary: white,
      secondary: "#808080"
    },
    primary: {
      main: "#24522c",
      contrastText: white
    },
    secondary: {
      main: "#562018",
      contrastText: white
    }
  }
})

const App = () => (
  <div className="App">
    <Container maxWidth="sm">
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          {!isExtension() && <h1>Davidsu Black Site</h1>}
          <WalkmeUrl />
          <br />
          <br />
          <SnippetSelector />
          <CustomUserSettings />
          <div>
            <LoadSuperscriptButton />
            <LoadWalkmeBtn />
          </div>
        </ThemeProvider>
      </Provider>
    </Container>
  </div>
)

export default App
