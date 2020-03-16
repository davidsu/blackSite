import React from "react"
import invert from "lodash/invert"
import Autocomplete from "./AutoComplete"
import { setSnippet } from "../core"

function getSnippetKey(snippet, snippetFiles) {
  if (snippet) {
    const result = invert(snippetFiles)[snippet]
    return result
  }
  if ("snippetOnPage" in snippetFiles) {
    return "snippetOnPage"
  }
  return ""
}
const TextArea = ({ snippet, snippetFiles }) => {
  const snippetKey = getSnippetKey(snippet, snippetFiles)
  return (
    <Autocomplete
      options={Object.keys(snippetFiles)}
      data-testid="snippetSelector"
      label="Snippet: Paste or Choose"
      onChange={value => {
        setSnippet(snippetFiles[value] || value || "")
      }}
      value={snippetKey}
    />
  )
}

export default TextArea
