import {
  sources,
  customPublicPath,
  customLibStorageKey,
  qaFeaturesKey
} from "./consts"
import { sendMessage, isExtension } from "./extensiontUtils"

const isLibExist = async url => {
  try {
    await fetch(url)
    return true
  } catch (e) {
    return false
  }
}
const libVersionUrl = (libVersion, cdn = "cdn.walkme") =>
  `https://${cdn}.com/player/lib/walkme_lib_${libVersion}.js`
async function getLibUrlByVersion(libVersion) {
  const cdnUrl = isLibExist(libVersionUrl(libVersion))
  const cdn2Url = isLibExist(libVersionUrl(libVersion, "cdn2.walkmedev"))
  if (await cdn2Url) return libVersionUrl(libVersion, "cdn2.walkmedev")
  if (await cdnUrl) return libVersionUrl(libVersion)
  return libVersion
}

function getRealWalkmeUrl(libVersion) {
  if (/^\d{8}-\d{6}/.test(libVersion)) {
    return getLibUrlByVersion(libVersion)
  }
  return sources[libVersion] || libVersion
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

async function syncWalkmeUrl({ walkmeUrl }) {
  const realUrl = await getRealWalkmeUrl(walkmeUrl.url)
  removeLocalStorage(customPublicPath)
  if (realUrl === "production") {
    removeLocalStorage(customLibStorageKey)
  } else {
    updateLocalStorage(customLibStorageKey, realUrl)
    const walkmeUrlRegex = /^(.*)(?:walkme_lib_|maketutorial_lib_)(\d{8}-\d{6}-\w{8})\.js/
    if (walkmeUrlRegex.test(realUrl)) {
      updateLocalStorage(
        customPublicPath,
        realUrl.replace(walkmeUrlRegex, "$1$2/")
      )
    }
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

async function syncStateToLocalStorage(state) {
  await syncWalkmeUrl(state)
  syncSnippet(state)
  syncUserSettings(state)
  syncQaFeatures(state)
}

export { syncStateToLocalStorage }
