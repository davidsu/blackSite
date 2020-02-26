import React from 'react'
import WalkmeUrl from './WalkmeUrl'
import './App.css';
class App extends React.Component {
  constructor() {
    super()
    this.state = { snippet: window.localStorage.getItem('snippet') || '' }
    this.inputChanged = event => this.setState({ snippet: event.target.value })
    this.loadWalkMe = this.loadWalkMe.bind(this)
  }

  loadWalkMe() {
    debugger
    const snippet = this.state.snippet.replace(/<script.*?>(.*)<\/script>/, '$1')
    window.localStorage.setItem('snippet', snippet)
    this.setState({ snippet })
    eval(snippet) //eslint-disable-line
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
      </div>
    )
  }
}

export default App;
