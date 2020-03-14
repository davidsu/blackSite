import { fireEvent } from "@testing-library/react"
import testkit from "./App.testkit"
import { snippetFiles } from "./consts"

it("should loadWalkMe on btn click", () => {
  const spyEval = jest.spyOn(window, "eval")
  fireEvent.click(testkit().getLoadWalkMeButton())
  expect(spyEval).toHaveBeenCalledWith("dummy")
})

it("should show snippet on load", () => {
  const text = testkit({ snippet: "someSnippet" }).getSnippetTextArea()
  expect(text.value).toEqual("someSnippet")
})

it("should select snippet through select box", () => {
  const spyEval = jest.spyOn(window, "eval")
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
