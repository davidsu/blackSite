import React from 'react'
import WalkmeUrl from '../WalkmeUrl'
import SnippetSelector from '../SnippetSelector'
import LoadWalkmeBtn from '../LoadWalkmeBtn'
import {isExtension} from '../core'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.inputChanged = event => this.props.setSnippet(event.target.value)
  }

  render() {
    console.log(this.props.snippet)
    return (
      <div className="App">
      {!isExtension() && <h1>Davidsu Black Site</h1>}
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
          <LoadWalkmeBtn/>
        </div>
        <WalkmeUrl />
        <SnippetSelector />
      </div>
    )
  }
}

export default App;
