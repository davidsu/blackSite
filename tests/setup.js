jest.mock("highlight.js/styles/default.css", () => ({}))
jest.mock("highlight.js/styles/darkula.css", () => ({}))
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: "BODY",
    ownerDocument: document
  }
})
beforeEach(() => {
  localStorage.clear()
  localStorage.setItem("snippet", "dummy")
})
