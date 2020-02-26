import React from 'react'
import WalkmeUrl from './WalkmeUrl'
import SnippetSelector from './SnippetSelector'
import './App.css';
class App extends React.Component {
  constructor() {
    super()
    this.state = { snippet: window.localStorage.getItem('snippet') || '' }
    this.inputChanged = event => this.setState({ snippet: event.target.value })
    this.loadWalkMe = this.loadWalkMe.bind(this)
    this.newSnippet = this.newSnippet.bind(this)
  }

  loadWalkMe() {
    const snippet = this.state.snippet.replace(/<script.*?>(.*)<\/script>/, '$1')
    window.localStorage.setItem('snippet', snippet)
    this.setState({ snippet })
    window._walkMe?.removeWalkMe?.() //eslint-disable-line
    try {
      eval(snippet) //eslint-disable-line no-eval
    } catch {}
  }

  componentDidMount() {
    this.btn.focus()
  }

  newSnippet(snippet) {
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
        <WalkmeUrl/>
        <SnippetSelector onChange={this.newSnippet} value={this.state.snippet} />
      </div>
    )
  }
}

export default App;
