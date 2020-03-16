import { getInitialState } from "./store/initialState"
import { loadWalkMe } from "./core"

console.log("inPage")
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
