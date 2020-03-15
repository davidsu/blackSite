import { combineReducers } from "redux"
import {
  SET_CUSTOM_SETTINGS_URL,
  SET_CUSTOM_SETTINGS_GUID,
  SET_CUSTOM_SETTINGS_ENV,
  INITIALIZE,
  SET_SNIPPET,
  SET_WALKME_URL,
  ADD_QA_FEATURE,
  DELETE_QA_FEATURE
} from "./actionTypes"
import { getInitialState } from "./initialState"
import { sources } from "../consts"

const createReducer = (initialState, reducers) => (
  state = initialState,
  action
) => {
  if (action.type in reducers) {
    return reducers[action.type](state, action)
  }
  return state
}

const customUserSettings = createReducer(
  {},
  {
    [SET_CUSTOM_SETTINGS_ENV]: (state, { payload }) => ({
      ...state,
      env: payload
    }),
    [SET_CUSTOM_SETTINGS_GUID]: (state, { payload }) => ({
      ...state,
      guid: payload
    }),
    [SET_CUSTOM_SETTINGS_URL]: (state, { payload }) => ({
      ...state,
      url: payload
    })
  }
)

const qaFeatures = createReducer(
  {},
  {
    [ADD_QA_FEATURE]: (state, { payload }) =>
      [...state, ...payload.split(/\s+/)].filter(a => a),
    [DELETE_QA_FEATURE]: (state, { payload }) => {
      const featureSet = new Set(state)
      featureSet.delete(payload)
      return [...featureSet].filter(a => a)
    }
  }
)

const combinedReducers = combineReducers({ customUserSettings, qaFeatures })
const rootReducer = (state = getInitialState(), action) => {
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
      return {
        ...state,
        walkmeUrl: action.payload,
        walkmeUrlSources: [
          ...new Set([action.payload, ...Object.keys(sources)])
        ]
      }
  }
  return {
    ...state,
    ...combinedReducers(state, action)
  }
}

const reducer = rootReducer
export { reducer }
