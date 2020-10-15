import { combineReducers } from "redux"
import {
  SET_CUSTOM_SETTINGS_URL,
  SET_CUSTOM_SETTINGS_GUID,
  SET_CUSTOM_SETTINGS_ENV,
  INITIALIZE,
  SET_SNIPPET,
  SET_WALKME_URL,
  ADD_QA_FEATURE,
  DELETE_QA_FEATURE,
  SET_USING_LOCAL_PRELIB,
  SET_USING_REDUX_STACK_TRACE,
  SET_LOCAL_ACTION_BOT,
  SET_LOCAL_ACTION_BOT_SERVER
} from "./actionTypes"
import { getInitialState } from "./initialState"
import { sources } from "../consts"

const createReducer = (reducers, initialState = {}) => (
  state = initialState,
  action
) => {
  if (action.type in reducers) {
    return reducers[action.type](state, action)
  }
  return state
}

const snippetFiles = state => state || {}
const customUserSettings = createReducer({
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
})

const qaFeatures = createReducer({
  [ADD_QA_FEATURE]: (state, { payload }) =>
    [...state, ...payload.split(/\s+/)].filter(a => a),
  [DELETE_QA_FEATURE]: (state, { payload }) => {
    const featureSet = new Set(state)
    featureSet.delete(payload)
    return [...featureSet].filter(a => a)
  }
})

const snippet = createReducer({
  [SET_SNIPPET]: (state, { payload }) =>
    payload.replace(/<script.*?>(.*)<\/script>/, "$1")
})

const walkmeUrl = createReducer({
  [SET_WALKME_URL]: (state, action) => ({
    url: action.payload,
    sources: [...new Set([action.payload, ...Object.keys(sources)])]
  })
})

const isUsingLocalPrelib = createReducer(
  {
    [SET_USING_LOCAL_PRELIB]: (state, { payload }) => payload
  },
  false
)
const isReduxStackTraceOn = createReducer(
  {
    [SET_USING_REDUX_STACK_TRACE]: (state, { payload }) => payload
  },
  false
)

const isLocalActionBot = createReducer(
  {
    [SET_LOCAL_ACTION_BOT]: (state, { payload }) => payload
  },
  false
)

const isLocalActionBotServer = createReducer(
  {
    [SET_LOCAL_ACTION_BOT_SERVER]: (state, { payload }) => payload
  },
  false
)

const combinedReducers = combineReducers({
  customUserSettings,
  qaFeatures,
  snippet,
  walkmeUrl,
  snippetFiles,
  isUsingLocalPrelib,
  isReduxStackTraceOn,
  isLocalActionBot,
  isLocalActionBotServer
})
const rootReducer = (state = getInitialState(), action) => {
  // eslint-disable-next-line
  switch(action.type) {
    case INITIALIZE:
      return action.payload
  }
  return combinedReducers(state, action)
}

const reducer = rootReducer
export { reducer }
