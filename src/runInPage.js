/* eslint-disable global-require */
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  const { getInitialState } = require("./store/initialState")
  const { loadWalkMe } = require("./core")
  if (request === "getInitialState") sendResponse(getInitialState())
  if (request.setLocalStorage) {
    localStorage.setItem(...request.setLocalStorage)
  }
  if (request.removeLocalStorage) {
    localStorage.removeItem(request.removeLocalStorage)
  }
  if (request.loadWalkMe) {
    const script = document.createElement("script")
    script.innerText = "window._walkMe?.removeWalkMe?.()"
    document.head.append(script)
    loadWalkMe(request.loadWalkMe)
  }

  if (request.evalCode) {
    eval(request.evalCode)
  }
})
