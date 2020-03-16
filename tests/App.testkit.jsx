import React from "react"
import { render } from "@testing-library/react"
import App from "../src/App"
import { store } from "../src/store"
import { INITIALIZE } from "../src/store/actionTypes"
import { getInitialState } from "../src/store/initialState"

export default (initialState = {}) => {
  store.dispatch({
    type: INITIALIZE,
    payload: { ...getInitialState(), ...initialState }
  })
  const rendered = render(<App />)
  const getLoadWalkMeButton = () => rendered.getByTestId("loadWalkMeButton")
  const getSnippetCodeDisplayer = () => rendered.getByTestId("snippetTextInput")
  const snippetSelectorInput = () =>
    rendered.getByTestId("snippetSelector").querySelector("input")
  const getWalkmeUrlSelectorInput = () =>
    rendered.getByTestId("WalkMeUrl").querySelector("input")
  return {
    store,
    rendered,
    getWalkmeUrlSelectorInput,
    getLoadWalkMeButton,
    getSnippetCodeDisplayer,
    snippetSelectorInput
  }
}
