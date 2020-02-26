import React from 'react'
import {snippetFiles} from './consts'

function getKeyFor(value) {
  for(const [k, v] of Object.entries(snippetFiles)) {
    if(v === value) return k
  }
  return null
}
class SnippetSelector extends React.Component {
  constructor(props) {
    super(props)
  }

  generateOptions() {
    return Object.keys(snippetFiles).map(key => <option key={key} value={key}>{key}</option>)
  }

  render() {
    return (
      <div className="dropdown dropdown-dark">
        <select 
          name="two" 
          className="dropdown-select" 
          value={getKeyFor(this.props.value)} 
          onChange={e => {
            this.props.onChange(snippetFiles[e.target.value] || '')

          }}>
            <option value="">Select snippet file</option>
            {this.generateOptions()}
        </select>
      </div>
    )

  }
}
export default SnippetSelector
