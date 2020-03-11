import React from 'react'
import WalkmeUrl from '../WalkmeUrl'
import SnippetSelector from '../SnippetSelector'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.inputChanged = event => this.props.setSnippet(event.target.value)
  }

  componentDidMount() {
    this.btn.focus()
  }

  render() {
    return (
      <div className="App">
        <h1>Davidsu Black Site</h1>
        <div >
          <textarea
            id="input"
            onFocus={({ target }) => target.select()}
            data-testid="snippetTextInput"
            name="snippet"
            value={this.props.snippet}
            onChange={this.inputChanged}></textarea>
        </div>
        <div>
          <button
            className="btn"
            data-testid="loadWalkMeButton"
            ref={(btn) => this.btn = btn}
            onClick={() => this.props.loadWalkMe(this.props.snippet)}>LOAD WALKME</button>
        </div>
        <WalkmeUrl />
        <SnippetSelector />
      </div>
    )
  }
}

export default App;
