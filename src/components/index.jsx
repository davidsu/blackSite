import { connect } from "react-redux"
import { SET_WALKME_URL } from "../store/actionTypes"
import WalkmeUrlComponent from "./WalkmeUrl"
import LoadWalkmeBtn from "./LoadWalkmeBtn"
import SnippetSelectorComponent from "./SnippetSelector"
import TextArea from "./TextArea"

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
const WalkmeUrl = connect(
  mapWalkmeUrlToKey,
  mapDispatchToChangeWalkmeUrl
)(WalkmeUrlComponent)

const mapStateToSnippet = ({ snippet }) => ({ snippet })
const SnippetSelector = connect(mapStateToSnippet)(SnippetSelectorComponent)
const SnippetTextArea = connect(mapStateToSnippet)(TextArea)
export { LoadWalkmeBtn, SnippetSelector, SnippetTextArea, WalkmeUrl }