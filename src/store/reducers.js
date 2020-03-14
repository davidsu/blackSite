import { INITIALIZE, SET_SNIPPET, SET_WALKME_URL } from "./actionTypes"
import { getInitialState } from "./initialState"
import { sources } from "../consts"

const reducer = (state = getInitialState(), action) => {
  // eslint-disable-next-line
    switch(action.type) {
    case INITIALIZE:
      return action.payload
    case SET_SNIPPET:
      return {
        ...state,
        snippet: action.payload.replace(/<script.*?>(.*)<\/script>/, "$1")
      }
    case SET_WALKME_URL:
      return { ...state, walkmeUrl: action.payload, walkmeUrlSources: [...new Set([action.payload, ...Object.keys(sources)])], }
  }
  return state
}

export { reducer }
