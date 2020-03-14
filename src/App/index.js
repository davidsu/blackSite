import { connect } from "react-redux"
import { setSnippet } from "../core"
import App from "./App"

function mapStateToProps(state) {
  return state
}
const mapDispatchToProps = () => ({ setSnippet })
export default connect(mapStateToProps, mapDispatchToProps)(App)
