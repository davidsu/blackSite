import React from "react"
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
import { setSnippet } from "../core"

const onInputChange = event => setSnippet(event.target.value)
const TextArea = ({ snippet }) => (
  <div>
    <TextareaAutosize
      id="input"
      aria-label="empty textarea"
      placeholder="paste you snippet here"
      onFocus={({ target }) => target.select()}
      data-testid="snippetTextInput"
      name="snippet"
      value={snippet}
      onChange={onInputChange}
    />
  </div>
)

export default TextArea
