import React from "react"
import { invert } from "lodash"
import { snippetFiles } from "../consts"
import { setSnippet } from '../core'

const generateOptions = () =>
  Object.keys(snippetFiles).map(key => (
    <option key={key} value={key}>
      {key}
    </option>
  ))
export default ({ snippet }) => (
  <div className="dropdown dropdown-dark">
    <select
      name="two"
      data-testid="snippetSelector"
      className="dropdown-select"
      value={invert(snippetFiles)[snippet] || ""}
      onChange={e => {
        setSnippet(snippetFiles[e.target.value] || "")
      }}
    >
      <option value="">Select snippet file</option>
      {generateOptions()}
    </select>
  </div>
)
