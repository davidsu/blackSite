import React from 'react'
import WalkmeUrl from '../WalkmeUrl'
import SnippetSelector from '../SnippetSelector'
import LoadWalkMeButton from '../LoadWalkMeButton'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.inputChanged = event => this.props.setSnippet(event.target.value)
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
      <LoadWalkMeButton {...this.props}/>
          
        </div>
        <WalkmeUrl />
        <SnippetSelector />
      </div>
    )
  }
}

export default App;
