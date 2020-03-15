import React from "react"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"

const WalkMeUrl = ({ onChangeWalkmeUrl, walkmeUrlKey, walkmeUrlSources }) => (
  <Autocomplete
    id="combo-box-demo"
    freeSolo
    options={walkmeUrlSources}
    getOptionLabel={option => option}
    data-testid="WalkMeUrl"
    size="small"
    onChange={(e, value) => {
      onChangeWalkmeUrl(value)
    }}
    value={walkmeUrlKey}
    renderInput={params => (
      <TextField
        onChange={({ target }) => {
          onChangeWalkmeUrl(target.value)
        }}
        {...params}
        size="small"
        label="Lib Version: Paste or Choose"
        variant="outlined"
      />
    )}
  />
)

export default WalkMeUrl
