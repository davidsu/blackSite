const getInitialState = () => ({
  snippet: window.localStorage.getItem("snippet") || "",
  walkmeUrl: localStorage.getItem("walkmeCustomeLibUrl") || "production"
})

export { getInitialState }
