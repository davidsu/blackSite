import SnippetSelector from './SnippetSelector'
import { setSnippet } from '../core'
import { connect } from 'react-redux'

function mapStateToProps({snippet}) {
    return { value: snippet }
}
const mapDispatchToProps = () => ({onChange: setSnippet})
export default connect(mapStateToProps, mapDispatchToProps)(SnippetSelector)
