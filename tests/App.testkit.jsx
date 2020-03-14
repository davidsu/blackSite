import React from "react"
import { render } from "@testing-library/react"
import App from "../src/App"
import { store } from "../src/store"
import { INITIALIZE } from "../src/store/actionTypes"
import { getInitialState } from "../src/store/initialState"

export default (initialState = getInitialState()) => {
  store.dispatch({ type: INITIALIZE, payload: initialState })
  const rendered = render(<App />)
  const getLoadWalkMeButton = () => rendered.getByTestId("loadWalkMeButton")
  const getSnippetTextArea = () => rendered.getByTestId("snippetTextInput")
  const getSnippetSelector = () => rendered.getByTestId("snippetSelector")
  const getWalkmeUrlSelectorInput = () =>
    rendered.getByTestId("WalkMeUrl").querySelector("input")
  return {
    store,
    rendered,
    getWalkmeUrlSelectorInput,
    getLoadWalkMeButton,
    getSnippetTextArea,
    getSnippetSelector
  }
}
