import { invert } from "lodash"
import { sources } from "../consts"

const persistedWalkmeUrl = (
  localStorage.getItem("walkmeCustomeLibUrl") || ""
).replace(/^.*(\d{8}-\d{6}.*)\.js$/, "$1")
const walkmeUrl =
  invert(sources)[persistedWalkmeUrl] || persistedWalkmeUrl || "production"
const walkmeUrlSources = [...new Set([walkmeUrl, ...Object.keys(sources)])]
const getInitialState = () => ({
  snippet: window.localStorage.getItem("snippet") || "",
  walkmeUrlSources,
  walkmeUrl
})

export { getInitialState }
