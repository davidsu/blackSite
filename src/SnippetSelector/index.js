import { connect } from "react-redux"
import SnippetSelector from "./SnippetSelector"
import { setSnippet } from "../core"

function mapStateToProps({ snippet }) {
  return { value: snippet }
}
const mapDispatchToProps = () => ({ onChange: setSnippet })
export default connect(mapStateToProps, mapDispatchToProps)(SnippetSelector)
