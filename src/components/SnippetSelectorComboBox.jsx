import React from "react"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import invert from "lodash/invert"
import { setSnippet } from "../core"
import { snippetFiles } from "../consts"

const TextArea = ({ snippet }) => (
  <Autocomplete
    freeSolo
    options={Object.keys(snippetFiles)}
    getOptionLabel={option => option}
    data-testid="snippetSelector"
    size="small"
    onChange={(e, value) => {
      setSnippet(snippetFiles[value] || "")
    }}
    value={invert(snippetFiles)[snippet] || ""}
    renderInput={params => (
      <TextField
        onChange={({ target }) => {
          setSnippet(snippetFiles[target.value] || target.value)
        }}
        {...params}
        size="small"
        label="Snippet: Paste or Choose"
        variant="outlined"
      />
    )}
  />
)

export default TextArea
