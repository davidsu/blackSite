import React from "react"
import { sources } from "../consts"

function makeRadio(props) {
  return Object.keys(sources).map(value => (
    <div
      key={value}
      onClick={() => props.onChangeWalkmeUrl(value)}
      style={{ cursor: "default" }}
    >
      <input
        style={{ marginTop: "15px", marginRight: "8px" }}
        type="radio"
        name="wm_source"
        value={value}
        onChange={() => {}}
        checked={value === props.walkmeUrlKey}
      />
      {value}
    </div>
  ))
}

// todo missing load walkme
const WalkMeUrl = props => (
  <div style={{ textAlign: "left", width: "140px", margin: "auto" }}>
    {makeRadio(props)}
  </div>
)

export default WalkMeUrl
