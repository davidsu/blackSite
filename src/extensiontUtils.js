function sendMessage(msg) {
  window.chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    window.chrome.tabs.sendMessage(tabs[0].id, msg)
  })
}

const isExtension = () => window?.chrome?.tabs
export { sendMessage, isExtension }
