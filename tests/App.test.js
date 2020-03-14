import { fireEvent } from "@testing-library/react"
import testkit from "./App.testkit"
import { snippetFiles, customLibStorageKey, sources } from "../src/consts"

const spyOnEval = () => jest.spyOn(window, "eval")
it("should loadWalkMe on btn click", () => {
  const spyEval = spyOnEval()
  fireEvent.click(testkit().getLoadWalkMeButton())
  expect(spyEval).toHaveBeenCalledWith("dummy")
})

it("should show snippet on load", () => {
  const text = testkit({ snippet: "someSnippet" }).getSnippetTextArea()
  expect(text.value).toEqual("someSnippet")
})

it("should select snippet through select box", () => {
  const spyEval = spyOnEval()
  const kit = testkit()
  const snippetSelector = kit.getSnippetSelector()
  fireEvent.change(snippetSelector, { target: { value: "end user IDP" } })
  expect(kit.store.getState().snippet).toEqual(snippetFiles["end user IDP"])
  expect(spyEval).toHaveBeenCalledWith(snippetFiles["end user IDP"])
})

it("should change selectBox value when snippet changed in textArea", () => {
  const kit = testkit()
  const textArea = kit.getSnippetTextArea()
  const snippetSelector = kit.getSnippetSelector()
  fireEvent.change(textArea, {
    target: { value: snippetFiles["one resource only"] }
  })
  expect(snippetSelector.value).toEqual("one resource only")
})

it("should set localStorage and reload walkme on customLibUrl change", () => {
  const spyEval = spyOnEval()
  const { getWalkmeUrlSelectorInput } = testkit()
  const walkmeUrlSelector = getWalkmeUrlSelectorInput()

  fireEvent.change(walkmeUrlSelector, { target: { value: "static" } })
  expect(localStorage.getItem(customLibStorageKey)).toEqual(sources.static)
  expect(spyEval).toHaveBeenCalledWith("dummy")
})

it("should dynamically add a typed key to customLibUrls", () => {
  const spyEval = spyOnEval()
  const { getWalkmeUrlSelectorInput } = testkit()
  const walkmeUrlSelector = getWalkmeUrlSelectorInput()
  const walkmeUrl = "20200309-112014-db3f672e-db3f672e"
  const customLibUrl =
    "https://cdn.walkme.com/player/lib/walkme_lib_20200309-112014-db3f672e-db3f672e.js"

  fireEvent.change(walkmeUrlSelector, { target: { value: walkmeUrl } })
  expect(localStorage.getItem(customLibStorageKey)).toEqual(customLibUrl)
  expect(spyEval).toHaveBeenCalledWith("dummy")
})

fit("should dynamically add a typed key to customLibUrls", () => {
  const spyEval = spyOnEval()
  const { getWalkmeUrlSelectorInput } = testkit()
  const walkmeUrlSelector = getWalkmeUrlSelectorInput()

  fireEvent.focus(walkmeUrlSelector)
  const webpackLocalUrlLi = [...document.querySelectorAll("li")].find(
    li => li.textContent === "webpack"
  )
  fireEvent.click(webpackLocalUrlLi)

  expect(localStorage.getItem(customLibStorageKey)).toEqual(sources.webpack)
  expect(spyEval).toHaveBeenCalledWith("dummy")
})
