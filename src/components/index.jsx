import { connect } from "react-redux"
import { invert } from "lodash"
import { sources } from "../consts"
import { SET_WALKME_URL } from "../store/actionTypes"
import WalkmeUrlComponent from "./WalkmeUrl"
import LoadWalkmeBtn from "./LoadWalkmeBtn"
import SnippetSelectorComponent from "./SnippetSelector"
import TextArea from "./TextArea"

function mapWalkmeUrlToKey({ walkmeUrl }) {
  const walkmeUrlKey = invert(sources)[walkmeUrl] || "production"
  return { walkmeUrlKey }
}
function mapDispatchToChangeWalkmeUrl(dispatch) {
  function onChangeWalkmeUrl(key) {
    const urlSrc = sources[key]
    dispatch({ type: SET_WALKME_URL, payload: urlSrc })
  }
  return { onChangeWalkmeUrl }
}
const WalkmeUrl = connect(
  mapWalkmeUrlToKey,
  mapDispatchToChangeWalkmeUrl
)(WalkmeUrlComponent)

const mapStateToSnippet = ({ snippet }) => ({ snippet })
const SnippetSelector = connect(mapStateToSnippet)(SnippetSelectorComponent)
const SnippetTextArea = connect(mapStateToSnippet)(TextArea)
export { LoadWalkmeBtn, SnippetSelector, SnippetTextArea, WalkmeUrl }
