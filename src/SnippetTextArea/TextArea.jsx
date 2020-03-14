import React from "react"

class TextArea extends React.Component {
  constructor(props) {
    super(props)
    this.inputChanged = event => this.props.setSnippet(event.target.value)
  }

  render() {
    return (
      <div className="App">
        <div>
          <textarea
            id="input"
            onFocus={({ target }) => target.select()}
            data-testid="snippetTextInput"
            name="snippet"
            value={this.props.snippet}
            onChange={this.inputChanged}
          />
        </div>
      </div>
    )
  }
}

export default TextArea
