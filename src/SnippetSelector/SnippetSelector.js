import React from 'react'
import {invert} from 'lodash'
import {snippetFiles} from '../consts'

const generateOptions = () => Object.keys(snippetFiles).map(key => <option key={key} value={key}>{key}</option>)
export default ({value, onChange}) => (
    <div className="dropdown dropdown-dark">
      <select 
        name="two" 
        data-testid="snippetSelector"
        className="dropdown-select" 
        value={invert(snippetFiles)[value] || ''} 
        onChange={e => {
          onChange(snippetFiles[e.target.value] || '')
        }}>
          <option value="">Select snippet file</option>
          {generateOptions()}
      </select>
    </div>
)
