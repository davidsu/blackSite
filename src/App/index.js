import {setSnippet, loadWalkMe} from '../core'
import App from './App'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return state
}
const mapDispatchToProps = () => ({setSnippet})
export default connect(mapStateToProps, mapDispatchToProps)(App)
