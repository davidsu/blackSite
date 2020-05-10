import invert from "lodash/invert"
import {
  snippetFiles,
  qaFeaturesKey,
  sources,
  customLibStorageKey,
  localPrelibKey,
  reduxStackTraceKey
} from "../consts"

function getInitialState() {
  const persistedWalkmeUrl = (
    localStorage.getItem(customLibStorageKey) || ""
  ).replace(/^.*(\d{8}-\d{6}.*)\.js$/, "$1")

  const url =
    invert(sources)[persistedWalkmeUrl] || persistedWalkmeUrl || "production"

  const walkmeUrl = {
    url,
    sources: [...new Set([url, ...Object.keys(sources)])].sort()
  }

  const snippetOnPage = [...document.querySelectorAll("script")]
    .map(s => s.textContent || "")
    .find(
      s => s.indexOf(`var walkme = document.createElement('script')`) !== -1
    )

  const storeSnippetFiles = snippetOnPage
    ? { ...snippetFiles, snippetOnPage }
    : snippetFiles
  const qaFeatures = (localStorage.getItem(qaFeaturesKey) || "")
    .split(/\s+/)
    .filter(a => a)

  return {
    snippetFiles: storeSnippetFiles,
    snippet: window.localStorage.getItem("snippet") || "",
    walkmeUrl,
    qaFeatures,
    isUsingLocalPrelib: !!localStorage.getItem(localPrelibKey),
    isReduxStackTraceOn: !!localStorage.getItem(reduxStackTraceKey),
    customUserSettings: {
      url: localStorage.getItem("walkme_custom_user_settings_url"),
      env: localStorage.getItem("walkme_custom_user_settings_env"),
      guid: localStorage.getItem("walkme_custom_user_settings_guid")
    }
  }
}

export { getInitialState }
