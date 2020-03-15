import { sources, customLibStorageKey } from "./consts"
import { sendMessage, isExtension } from "./extensiontUtils"
import { store } from "./store"

function getRealWalkmeUrl(libVersion) {
  if (/^\d{8}-\d{6}/.test(libVersion)) {
    return `https://cdn.walkme.com/player/lib/walkme_lib_${libVersion}.js`
  }
  return sources[libVersion]
}

function setLocalStorage(key, value) {
  if (isExtension()) {
    sendMessage({ setLocalStorage: [key, value] })
  } else {
    localStorage.setItem(key, value)
  }
}

function removeLocalStorage(key) {
  if (isExtension()) {
    sendMessage({ removeLocalStorage: key })
  } else {
    localStorage.removeItem(key)
  }
}

function updateLocalStorage(key, value) {
  if (!value) {
    removeLocalStorage(key)
  } else {
    setLocalStorage(key, value)
  }
}

function syncWalkmeUrl(url) {
  const realUrl = getRealWalkmeUrl(url)
  if (realUrl === "production") {
    removeLocalStorage(customLibStorageKey)
  } else {
    updateLocalStorage(customLibStorageKey, realUrl)
  }
}

function syncUserSettings(userSettings) {
  for (const [key, value] of Object.entries(userSettings)) {
    updateLocalStorage(`walkme_custom_user_settings_${key}`, value)
  }
}

function syncSnippet(snippet) {
  setLocalStorage("snippet", snippet)
}

function syncStateToLocalStorage() {
  const state = store.getState()
  syncWalkmeUrl(state.walkmeUrl)
  syncSnippet(state.snippet)
  syncUserSettings(state.customUserSettings)
}

export { syncStateToLocalStorage }
