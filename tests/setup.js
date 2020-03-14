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
