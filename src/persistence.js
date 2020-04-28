import {
  sources,
  customPublicPath,
  customLibStorageKey,
  qaFeaturesKey
} from "./consts"
import { sendMessage, isExtension } from "./extensiontUtils"

const isLibExist = url =>
  new Promise(resolve => {
    const request = new XMLHttpRequest()
    request.open("get", url, true)
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        resolve(request.status === 200 || request.status === 0)
      }
    }
    request.send(null)
  })

const libVersionUrl = (libVersion, cdn = "cdn.walkme") =>
  `https://${cdn}.com/player/lib/walkme_lib_${libVersion}.js`
async function getLibUrlByVersion(libVersion) {
  const dev2Url = libVersionUrl(libVersion, "cdn2.walkmedev")
  const cdnUrl = libVersionUrl(libVersion)
  if (await isLibExist(dev2Url)) return dev2Url
  return cdnUrl
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
    const walkmeUrlRegex = /^(.*)(?:walkme_lib_|maketutorial_lib_)(\d{8}-\d{6}(?:-\w{8}){1,2})\.js/
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
