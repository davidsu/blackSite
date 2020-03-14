import React from 'react'
import {loadWalkMe} from '../core'
export default () => (
  <button
    className="btn"
    data-testid="loadWalkMeButton"
    autoFocus
    onClick={loadWalkMe}>
    LOAD WALKME
  </button>
)
