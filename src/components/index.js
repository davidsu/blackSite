import { connect } from "react-redux"
import {
  SET_CUSTOM_SETTINGS_URL,
  SET_CUSTOM_SETTINGS_GUID,
  SET_CUSTOM_SETTINGS_ENV,
  SET_WALKME_URL,
  ADD_QA_FEATURE,
  DELETE_QA_FEATURE
} from "../store/actionTypes"
import WalkmeUrlComponent from "./WalkmeUrl"
import LoadWalkmeBtn from "./LoadWalkmeBtn"
import SnippetSelectorComponent from "./SnippetSelector"
import CustomUserSettingsComponent from "./CustomUserSettings"
import LoadSuperscriptButton from "./LoadSuperscriptButton"
import FeaturesListComponent from "./FeaturesList"

function mapWalkmeUrlToKey({ walkmeUrl, walkmeUrlSources }) {
  const walkmeUrlKey = walkmeUrl
  return { walkmeUrlKey, walkmeUrlSources }
}
function mapDispatchToChangeWalkmeUrl(dispatch) {
  function onChangeWalkmeUrl(key) {
    dispatch({ type: SET_WALKME_URL, payload: key })
  }
  return { onChangeWalkmeUrl }
}

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

const mapStateToSnippet = ({ snippet }) => ({ snippet })
const SnippetSelector = connect(mapStateToSnippet)(SnippetSelectorComponent)
export {
  LoadWalkmeBtn,
  SnippetSelector,
  WalkmeUrl,
  CustomUserSettings,
  LoadSuperscriptButton,
  FeaturesList
}
