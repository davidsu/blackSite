import { connect } from "react-redux"
import { invert } from "lodash"
import WalkmeUrl from "./WalkmeUrl"
import { sources } from "../consts"
import { SET_WALKME_URL } from "../store/actionTypes"

function mapStateToProps({ walkmeUrl }) {
  const walkmeUrlKey = invert(sources)[walkmeUrl] || "production"
  return { walkmeUrlKey }
}
function mapDispatchToProps(dispatch) {
  function onChangeWalkmeUrl(key) {
    const urlSrc = sources[key]
    dispatch({ type: SET_WALKME_URL, payload: urlSrc })
  }
  return { onChangeWalkmeUrl }
}
export default connect(mapStateToProps, mapDispatchToProps)(WalkmeUrl)
