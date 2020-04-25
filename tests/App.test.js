import { fireEvent } from "@testing-library/react"
import { js_beautify } from "js-beautify"
import testkit from "./App.testkit"
import { snippetFiles, customLibStorageKey, sources } from "../src/consts"
import { eventually } from "./testUtils"

const spyOnEval = () => jest.spyOn(window, "eval")
it("should loadWalkMe on btn click", () => {
  const spyEval = spyOnEval()
  fireEvent.click(testkit().getLoadWalkMeButton())
  expect(spyEval).toHaveBeenCalledWith("dummy")
})

it("should show snippet on load", () => {
  const text = testkit({ snippet: "someSnippet" }).getSnippetCodeDisplayer()
  expect(text.textContent).toEqual("someSnippet")
})

it("should select snippet through select box", async () => {
  const spyEval = spyOnEval()
  const kit = testkit()
  const snippetSelector = kit.snippetSelectorInput()
  fireEvent.change(snippetSelector, { target: { value: "end user IDP" } })
  expect(kit.store.getState().snippet).toEqual(snippetFiles["end user IDP"])
  await eventually(() =>
    expect(spyEval).toHaveBeenCalledWith(snippetFiles["end user IDP"])
  )
})

it("should change selectBox value when snippet changed in textArea", () => {
  const kit = testkit()
  const snippetKey = "one resource only"
  const snippetCodeDisplayer = kit.getSnippetCodeDisplayer()
  const snippetSelector = kit.snippetSelectorInput()
  fireEvent.change(snippetSelector, {
    target: { value: snippetFiles[snippetKey] }
  })
  expect(snippetCodeDisplayer.textContent).toEqual(
    js_beautify(snippetFiles[snippetKey])
  )
  expect(snippetSelector.value).toEqual(snippetKey)
})

it("should set localStorage and reload walkme on customLibUrl change", async () => {
  const spyEval = spyOnEval()
  const { getWalkmeUrlSelectorInput } = testkit()
  const walkmeUrlSelector = getWalkmeUrlSelectorInput()

  fireEvent.change(walkmeUrlSelector, { target: { value: "static" } })
  await eventually(() => {
    expect(localStorage.getItem(customLibStorageKey)).toEqual(sources.static)
    expect(spyEval).toHaveBeenCalledWith("dummy")
  })
})

it("should dynamically add a typed key to customLibUrls", async () => {
  const spyEval = spyOnEval()
  const { getWalkmeUrlSelectorInput } = testkit()
  const walkmeUrlSelector = getWalkmeUrlSelectorInput()
  const walkmeUrl = "20200309-112014-db3f672e-db3f672e"
  const customLibUrl =
    "https://cdn.walkme.com/player/lib/walkme_lib_20200309-112014-db3f672e-db3f672e.js"

  fireEvent.change(walkmeUrlSelector, { target: { value: walkmeUrl } })
  await (() => {
    expect(localStorage.getItem(customLibStorageKey)).toEqual(customLibUrl)
    expect(spyEval).toHaveBeenCalledWith("dummy")
  })
})

it("should dynamically add a typed key to customLibUrls", async () => {
  const spyEval = spyOnEval()
  const { getWalkmeUrlSelectorInput } = testkit()
  const walkmeUrlSelector = getWalkmeUrlSelectorInput()

  fireEvent.focus(walkmeUrlSelector)
  const webpackLocalUrlLi = [...document.querySelectorAll("li")].find(
    li => li.textContent === "webpack"
  )
  fireEvent.click(webpackLocalUrlLi)

  await (() => {
    expect(localStorage.getItem(customLibStorageKey)).toEqual(sources.webpack)
    expect(spyEval).toHaveBeenCalledWith("dummy")
  })
})
