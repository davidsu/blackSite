import { sources, customLibStorageKey, qaFeaturesKey } from "./consts"
import { sendMessage, isExtension } from "./extensiontUtils"

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

function syncWalkmeUrl({ walkmeUrl }) {
  const realUrl = getRealWalkmeUrl(walkmeUrl)
  if (realUrl === "production") {
    removeLocalStorage(customLibStorageKey)
  } else {
    updateLocalStorage(customLibStorageKey, realUrl)
  }
}

function syncUserSettings({ customUserSettings }) {
  for (const [key, value] of Object.entries(customUserSettings)) {
    updateLocalStorage(`walkme_custom_user_settings_${key}`, value)
  }
}

function syncSnippet({ snippet }) {
  setLocalStorage("snippet", snippet)
}

function syncQaFeatures({ qaFeatures }) {
  setLocalStorage(qaFeaturesKey, qaFeatures.join(" "))
}

function syncStateToLocalStorage(state) {
  syncWalkmeUrl(state)
  syncSnippet(state)
  syncUserSettings(state)
  syncQaFeatures(state)
}

export { syncStateToLocalStorage }
