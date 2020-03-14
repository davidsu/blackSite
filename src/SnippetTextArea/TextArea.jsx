import React from "react"
import TextareaAutosize from "@material-ui/core/TextareaAutosize"

class TextArea extends React.Component {
  constructor(props) {
    super(props)
    this.inputChanged = event => this.props.setSnippet(event.target.value)
  }

  render() {
    return (
      <div>
        <TextareaAutosize
          id="input"
          aria-label="empty textarea"
          placeholder="paste you snippet here"
          onFocus={({ target }) => target.select()}
          data-testid="snippetTextInput"
          name="snippet"
          value={this.props.snippet}
          onChange={this.inputChanged}
        />
      </div>
    )
  }
}

export default TextArea
