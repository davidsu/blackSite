import invert from "lodash/invert"
import { qaFeaturesKey, sources, customLibStorageKey } from "../consts"

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

  const qaFeatures = (localStorage.getItem(qaFeaturesKey) || "")
    .split(/\s+/)
    .filter(a => a)

  return {
    snippet: window.localStorage.getItem("snippet") || "",
    walkmeUrl,
    qaFeatures,
    customUserSettings: {
      url: localStorage.getItem("walkme_custom_user_settings_url"),
      env: localStorage.getItem("walkme_custom_user_settings_env"),
      guid: localStorage.getItem("walkme_custom_user_settings_guid")
    }
  }
}

export { getInitialState }
