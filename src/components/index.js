import { connect } from "react-redux"
import {
  SET_CUSTOM_SETTINGS_URL,
  SET_CUSTOM_SETTINGS_GUID,
  SET_CUSTOM_SETTINGS_ENV,
  SET_WALKME_URL,
  ADD_QA_FEATURE,
  DELETE_QA_FEATURE,
  SET_USING_LOCAL_PRELIB,
  SET_USING_REDUX_STACK_TRACE,
  SET_LOCAL_ACTION_BOT,
  SET_LOCAL_ACTION_BOT_SERVER
} from "../store/actionTypes"
import { loadExternalConfig } from "../core"
import WalkmeUrlComponent from "./WalkmeUrl"
import LoadWalkmeBtn from "./LoadWalkmeBtn"
import SnippetSelectorComponent from "./SnippetSelector"
import CustomUserSettingsComponent from "./CustomUserSettings"
import LoadSuperscriptButton from "./LoadSuperscriptButton"
import FeaturesListComponent from "./FeaturesList"
import DumpConfigurationComponent from "./DumpConfiguration"
import IsLocalPrelibComponent from "./IsLocalPrelib"
import EnableReduxStackTraceComponent from "./EnableReduxStackTrace"
import LocalActionBotComponent from "./LocalActionBot"
import LocalActionBotServerComponent from "./LocalActionBotServer"

function mapWalkmeUrlToKey({ walkmeUrl }) {
  const walkmeUrlKey = walkmeUrl.url
  const walkmeUrlSources = walkmeUrl.sources
  return { walkmeUrlKey, walkmeUrlSources }
}
function mapDispatchToChangeWalkmeUrl(dispatch) {
  function onChangeWalkmeUrl(key) {
    dispatch({ type: SET_WALKME_URL, payload: key })
  }
  return { onChangeWalkmeUrl }
}

const mapDispathToLoadDumpedConfig = () => ({
  loadConfigFile: file => {
    const reader = new FileReader()
    reader.onload = () => {
      loadExternalConfig(JSON.parse(reader.result))
    }
    reader.readAsText(file)
  }
})
const mapDispatchToSetCustomUserSettings = dispatch => ({
  setUrl: payload => dispatch({ type: SET_CUSTOM_SETTINGS_URL, payload }),
  setGuid: payload => dispatch({ type: SET_CUSTOM_SETTINGS_GUID, payload }),
  setEnv: payload => dispatch({ type: SET_CUSTOM_SETTINGS_ENV, payload })
})

const mapStateToQaFeatures = ({ qaFeatures }) => ({ qaFeatures })
const mapDispathToSetQaFeatures = dispatch => ({
  addFeature: payload => dispatch({ type: ADD_QA_FEATURE, payload }),
  deleteFeature: payload => dispatch({ type: DELETE_QA_FEATURE, payload })
})

const DumpConfiguration = connect(
  state => ({ state }),
  mapDispathToLoadDumpedConfig
)(DumpConfigurationComponent)
const FeaturesList = connect(
  mapStateToQaFeatures,
  mapDispathToSetQaFeatures
)(FeaturesListComponent)
const CustomUserSettings = connect(
  state => state.customUserSettings,
  mapDispatchToSetCustomUserSettings
)(CustomUserSettingsComponent)

const WalkmeUrl = connect(
  mapWalkmeUrlToKey,
  mapDispatchToChangeWalkmeUrl
)(WalkmeUrlComponent)

const mapStateToSnippet = ({ snippet, snippetFiles }) => ({
  snippet,
  snippetFiles
})
const SnippetSelector = connect(mapStateToSnippet)(SnippetSelectorComponent)

const EnableReduxStackTrace = connect(
  ({ isReduxStackTraceOn }) => ({ isReduxStackTraceOn }),
  dispatch => ({
    setReduxStackTrace: payload =>
      dispatch({ type: SET_USING_REDUX_STACK_TRACE, payload })
  })
)(EnableReduxStackTraceComponent)

const LocalActionBot = connect(
  ({ isLocalActionBot }) => ({ isLocalActionBot }),
  dispatch => ({
    setLocalActionBot: payload =>
      dispatch({ type: SET_LOCAL_ACTION_BOT, payload })
  })
)(LocalActionBotComponent)

const LocalActionBotServer = connect(
  ({ isLocalActionBotServer }) => ({ isLocalActionBotServer }),
  dispatch => ({
    setLocalActionBotServer: payload =>
      dispatch({ type: SET_LOCAL_ACTION_BOT_SERVER, payload })
  })
)(LocalActionBotServerComponent)

const IsLocalPrelib = connect(
  ({ isUsingLocalPrelib }) => ({ isUsingLocalPrelib }),
  dispatch => ({
    setLocalPrelib: payload =>
      dispatch({ type: SET_USING_LOCAL_PRELIB, payload })
  })
)(IsLocalPrelibComponent)

export {
  LocalActionBot,
  LoadWalkmeBtn,
  SnippetSelector,
  WalkmeUrl,
  CustomUserSettings,
  LoadSuperscriptButton,
  FeaturesList,
  DumpConfiguration,
  IsLocalPrelib,
  EnableReduxStackTrace,
  LocalActionBotServer
}
