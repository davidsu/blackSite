import React from "react"
import Autocomplete from "./AutoComplete"

const WalkMeUrl = ({ onChangeWalkmeUrl, walkmeUrlKey, walkmeUrlSources }) => (
  <Autocomplete
    options={walkmeUrlSources}
    onChange={onChangeWalkmeUrl}
    value={walkmeUrlKey}
    label="Lib Version: Paste or Choose"
    data-testid="WalkMeUrl"
  />
)

export default WalkMeUrl
