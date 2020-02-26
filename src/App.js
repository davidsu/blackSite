import React from 'react'
import WalkmeUrl from './WalkmeUrl'
import SnippetSelector from './SnippetSelector'
import './App.css';

let reloadWalkmeCountDown = 6
function loadWalkMe(snippet) {
    const fixedSnippet = snippet.replace(/<script.*?>(.*)<\/script>/, '$1')
    window.localStorage.setItem('snippet', fixedSnippet)
    if(!(--reloadWalkmeCountDown)) location.reload() //eslint-disable-line no-restricted-globals
    window._walkMe?.removeWalkMe?.() //eslint-disable-line
    try {
      eval(fixedSnippet) //eslint-disable-line no-eval
    } catch {}
    return fixedSnippet
}
class App extends React.Component {
  constructor() {
    super()
    const snippet = loadWalkMe(window.localStorage.getItem('snippet') || '')
    this.state = { snippet }
    this.inputChanged = event => this.setState({ snippet: event.target.value })
    this.loadWalkMe = this.loadWalkMe.bind(this)
    this.newSnippet = this.onSnippetChange.bind(this)
  }

  loadWalkMe() {
      const snippet = loadWalkMe(this.state.snippet)
      this.setState({ snippet })
  }

  componentDidMount() {
    this.btn.focus()
  }

  onSnippetChange(snippet) {
      this.setState({snippet}, this.loadWalkMe)
  }

  render() {
    return (
      <div className="App">
        <h1>Davidsu Black Site</h1>
        <div >
          <textarea
            id="input"
            onFocus={({ target }) => target.select()}
            name="snippet"
            value={this.state.snippet}
            onChange={this.inputChanged}></textarea>
        </div>
        <div>
          <button
            className="btn"
            ref={(btn) => this.btn = btn}
            onClick={this.loadWalkMe}>LOAD WALKME</button>
        </div>
        <WalkmeUrl onChange={() => loadWalkMe(this.state.snippet)}/>
        <SnippetSelector onChange={this.onSnippetChange} value={this.state.snippet} />
      </div>
    )
  }
}

export default App;
