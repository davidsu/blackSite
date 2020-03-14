import { connect } from "react-redux"
import { setSnippet } from "../core"
import TextArea from "./TextArea"

const mapStateToProps = ({ snippet }) => ({ snippet })
const mapDispatchToProps = () => ({ setSnippet })
export default connect(mapStateToProps, mapDispatchToProps)(TextArea)
