import { fireEvent } from "@testing-library/react"
import testkit from "./App.testkit"
import { snippetFiles } from "./consts"

test("should loadWalkMe on btn click", () => {
  const spyEval = jest.spyOn(window, "eval")
  fireEvent.click(testkit().getLoadWalkMeButton())
  expect(spyEval).toHaveBeenCalledWith("dummy")
})

test("should show snippet on load", () => {
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
