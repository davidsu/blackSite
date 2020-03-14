import { invert } from "lodash"
import { sources, customLibStorageKey } from "../consts"

function getInitialState() {
  const persistedWalkmeUrl = (
    localStorage.getItem(customLibStorageKey) || ""
  ).replace(/^.*(\d{8}-\d{6}.*)\.js$/, "$1")

  const walkmeUrl =
    invert(sources)[persistedWalkmeUrl] || persistedWalkmeUrl || "production"

  const walkmeUrlSources = [
    ...new Set([walkmeUrl, ...Object.keys(sources)])
  ].sort()

  return {
    snippet: window.localStorage.getItem("snippet") || "",
    walkmeUrlSources,
    walkmeUrl
  }
}

export { getInitialState }
