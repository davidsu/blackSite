import WalkmeUrl from './WalkmeUrl'
import { connect } from 'react-redux'
import { sources } from '../consts'
import {invert} from 'lodash'
import {SET_WALKME_URL} from '../store/actionTypes'

function mapStateToProps({walkmeUrl}) {
    const __key = invert(sources)[walkmeUrl] || 'production'
    return { __key }
}
function mapDispatchToProps(dispatch) {
    function onChangeWalkmeUrl (key) {
        const urlSrc = sources[key]
        dispatch({type: SET_WALKME_URL, payload: urlSrc})
    }
    return {onChangeWalkmeUrl}
}
export default connect(mapStateToProps, mapDispatchToProps)(WalkmeUrl)
